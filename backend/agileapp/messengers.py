import uuid

from django.utils import timezone
from django.core.cache import caches

from agileapp.models import Workspace, Permission, Project, Task, Comment
from agileapp.models import UserRole, TaskType, TaskPriority, TaskStatus


class Messenger:
    user_cache = caches["user"]
    msg_cache = caches["msg"]

    @classmethod
    def _drop_msgs(cls, receivers, is_same, msg=None, msgs=None):
        if not receivers:
            return

        user_bufs = cls.user_cache.get_many(receivers)
        if is_same:
            msg_dict = {str(uuid.uuid4()): msg for _ in range(len(receivers))}
            msg_ids = list(msg_dict.keys())
            for msg_id, receiver in zip(msg_ids, receivers):
                if receiver not in user_bufs:
                    user_bufs[receiver] = set()
                user_bufs[receiver].add(msg_id)
        else:
            msg_dict = {}
            for receiver, msg in zip(receivers, msgs):
                msg_id = str(uuid.uuid4())
                msg_dict[msg_id] = msg
                if receiver not in user_bufs:
                    user_bufs[receiver] = set()
                user_bufs[receiver].add(msg_id)

        cls.msg_cache.set_many(msg_dict)
        cls.user_cache.set_many(user_bufs)

    @classmethod
    def pull_msgs(cls, receiver):
        user_buf = cls.user_cache.get(receiver, set())
        valid_msgs = cls.msg_cache.get_many(user_buf)

        user_buf &= valid_msgs.keys()
        if user_buf:
            cls.user_cache.set(receiver, user_buf)
        else:
            cls.user_cache.delete(receiver)

        for msg_id, msg in valid_msgs.items():
            msg['id'] = msg_id
        return sorted(valid_msgs.values(), key=lambda m: m["timestamp"], reverse=True)

    @classmethod
    def ack_msgs(cls, receiver, msg_ids):
        msg_ids = set(msg_ids)
        user_buf = cls.user_cache.get(receiver, set())
        msg_ids &= user_buf
        if msg_ids:
            cls.msg_cache.delete_many(msg_ids)
            user_buf -= msg_ids
            if user_buf:
                cls.user_cache.set(receiver, user_buf)
            else:
                cls.user_cache.delete(receiver)


class TaskMessenger(Messenger):
    @classmethod
    def gen_task_changelist(cls, msg_type, new_data):
        changelist = {}
        for key, value in new_data.items():
            if msg_type == 'TaskCreated' and key in ('project', 'title'):
                continue
            changelist[key] = str(value)
        return changelist

    @classmethod
    def send_task_msgs(cls, msg_type, operator, task, changelist):
        # message type is TaskCreate or TaskUpdate, but no changes
        if changelist is not None and len(changelist) == 0:
            return

        subject = '%s, %s, %s' % (task.project.workspace.name, task.project.name, task.title)
        msg = {
            'type': msg_type,
            'operator': operator.first_name + ' ' + operator.last_name,
            'subject': subject,
            'timestamp': str(timezone.now()),
        }
        if changelist:
            msg['changelist'] = changelist

        receivers = set(task.watchers.values_list("username", flat=True))
        receivers.discard(operator.username)
        cls._drop_msgs(list(receivers), is_same=True, msg=msg)


class PermMessenger(Messenger):
    @classmethod
    def gen_perm_changelist(cls, workspace_id, user_roles):
        changelist = {}
        for role in (UserRole.ADMIN, UserRole.EDITOR):
            for user in user_roles[role]:
                perm = Permission.objects.filter(workspace__id=workspace_id, user=user).first()
                if not perm or perm.role != role:
                    changelist[user.username] = role
        for user in user_roles[UserRole.VIEWER]:
            perm = Permission.objects.filter(workspace__id=workspace_id, user=user).first()
            if perm:
                changelist[user.username] = UserRole.VIEWER
        return changelist

    @classmethod
    def send_perm_msgs(cls, operator, workspace, changelist):
        changelist.pop(operator.username, None)
        receivers = list(changelist.keys())
        msgs = [
            {
                'type': 'Permission',
                'operator': operator.first_name + ' ' + operator.last_name,
                'subject': 'Your new user role at %s is %s' % (
                    workspace.name, str(changelist[receiver]).upper(),
                ),
                'timestamp': str(timezone.now()),
            }
            for receiver in receivers
        ]
        cls._drop_msgs(receivers, is_same=False, msgs=msgs)
