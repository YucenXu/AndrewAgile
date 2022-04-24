# User Manual

## Introduction
A web application serves as an agile platform, with similar functionalities as Jira and Trello.

## Main concepts
### Workspace
Workspace is the highest level of scope, usually designated to a specific department or team.

Workspace cannot be created by users, please contact developers if you want to request a new workspace for your department.

Any workspace incorporates all users automatically, but users will have different roles within a certain workspace:

+ Admin: full access to workspace projects and tasks; can upgrade or downgrade other users' roles.

+ Editor: view/create/update/delete/comment access to workspace projects and tasks.

+ Viewer: only view access to workspace projects and tasks (the default role).

### Project
Project is the second level of scope under workspace. A workspace may have multiple projects.

Project attributes include name, description, and owner. The user who creates the project will become the project owner automatically.

### Task
Task is the basic unit of agile methodology. Task attributes include title, description, type, status, priority, assignee, reporter, visibility, watchlist, and user comments.

+ Task types

  + Story: common tasks, for example a new feature
  
  + Issue: something abnormal that needs to be fixed, similar to bugs
  
  + Action: destructive operations that usually requires manager-level approval

+ Task statuses: backlog, todo, in progress, done 

+ Task priorities: critical, important, normal, low

## List of features
### Kanban board

+ Create a new project

+ View, create, update, delete a task

+ Designate a task's assignee and reporter

+ Add or delete your comments under a task

+ Watch or unwatch a task

+ Archive or restore a task

+ Drag and drop task cards to update status directly

+ Filter tasks by search, watchlist, task importance, task archives

### Progress tracking

+ Total project count; total task count

+ Completed task percentage; archived task percentage

+ Task statistics charts by status and type

+ Recently updated task list

### Access control

+ View all user roles under a workspace

+ Upgrade or downgrade user roles if you are admin

+ Search users by full name and username

### Notification center

There are five kinds of messages: TaskCreated, TaskUpdated, TaskDeleted, NewComment, Permission.

For task related messages, all users on the task watchlist except the operator will receive notification.

The current assignee and reporter of a task are on the watchlist by default, and they cannot unwatch it until not designated as assignee or reporter.

For permission related messages, the user whose role is changed by admins will receive notification.

### User identity

Users need a valid Google account to register and login to the platform.

## Contact

+ [Nianyi Guo](https://github.com/jujujulia123)

+ [Yucen Xu](https://github.com/YucenXu)

+ [Zhiqi Li](https://github.com/Angelica-Lee)

+ [Peng Zhao](https://github.com/zp9763)

