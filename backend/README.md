# Backend API spec

## API permission check

Unsafe REST API methods such as POST, PUT, DELETE which modify backend data will have a pre-flight permission check serving as user access control. Within each workspace, only Admin and Editor have the permission to call these APIs. Otherwise the APIs will return 403 directly. A user is Viewer of all workspaces by default. User permissions can be granted by Admin users of each workspace. See [Update user permissions API](#update-user-permissions) for details.

```json
{
    # http status code = 403
    "error": "Only admins and editors can modify backend data."
}
```

## User API

### User logout

Path: /api/logout

Method: POST

Response: 200

### Get current user info

Path: /api/userinfo

Method: GET

Response:

+ 200

  ```json
  {
      "username": "userA",
      "email": "usera@gmail.com",
      "firstname": "Afirst",
      "lastname": "Alast",
      "dateJoined": "2022-04-05T17:04:34.326932-04:00"
  }
  ```

+ 401

## Workspace API

### Get all workspaces

Path: /api/workspaces

Method: GET

Response: 200

```json
[
    {
        "id": 1,
        "name": "Product",
        "description": "This is the workspace for Product",
        "createdAt": "2022-03-27T22:52:32-04:00",
        "lastUpdatedAt": "2022-03-27T22:52:32-04:00"
    },
    {
        "id": 2,
        "name": "DevOps",
        "description": "This is the workspace for DevOps",
        "createdAt": "2022-03-27T22:52:32.221848-04:00",
        "lastUpdatedAt": "2022-03-27T22:52:32.221849-04:00"
    }
]
```

### Get workspace by ID

Path: /api/workspace/\<int:wid\>

Method: GET

Response:

+ 200

  ```json
  {
      "id": 1,
      "name": "Product",
      "description": "This is the workspace for Product",
      "createdAt": "2022-03-27T22:52:32-04:00",
      "lastUpdatedAt": "2022-03-27T22:52:32-04:00"
  }
  ```

+ 404

## Permission API

### Get current user scope

Path: /api/userscope

Method: GET

Response: 200

```json
{
    "admin": [1, 2],
    "editor": [3],
    "viewer": [4, 5]
}
```

### Get all users of a workspace

Path: /api/workspace/\<int:wid\>/users

Method: GET

Response: 200

```json
[
    {
        "role": "admin",
        "username": "testuser-1",
        "email": "testuser-1@gmail.com",
        "firstname": "Firstname-1",
        "lastname": "Lastname-1",
        "dateJoined": "2022-04-06T14:21:41.778465-04:00"
    },
    {
        "role": "editor",
        "username": "testuser-2",
        "email": "testuser-2@gmail.com",
        "firstname": "Firstname-2",
        "lastname": "Lastname-2",
        "dateJoined": "2022-04-06T14:21:41.825741-04:00"
    },
    {
        "role": "viewer",
        "username": "testuser-3",
        "email": "testuser-3@gmail.com",
        "firstname": "Firstname-3",
        "lastname": "Lastname-3",
        "dateJoined": "2022-04-06T14:21:41.872694-04:00"
    }
]
```

### Update user permissions

Path: /api/workspace/\<int:wid\>/users

Method: PUT

Request:

```json
# required format: a dict of (username,role) pairs
{
    "testuser-1": "admin",
    "testuser-2": "viewer",
    "testuser-3": "editor"
}
```

Response:

+ 200

  ```json
  [
      {
          "role": "admin",
          "username": "testuser-1",
          "email": "testuser-1@gmail.com",
          "firstname": "Firstname-1",
          "lastname": "Lastname-1",
          "dateJoined": "2022-04-06T14:21:41.778465-04:00"
      },
      {
          "role": "editor",
          "username": "testuser-2",
          "email": "testuser-2@gmail.com",
          "firstname": "Firstname-2",
          "lastname": "Lastname-2",
          "dateJoined": "2022-04-06T14:21:41.825741-04:00"
      },
      {
          "role": "viewer",
          "username": "testuser-3",
          "email": "testuser-3@gmail.com",
          "firstname": "Firstname-3",
          "lastname": "Lastname-3",
          "dateJoined": "2022-04-06T14:21:41.872694-04:00"
      }
  ]
  ```

+ 400

  ```json
  {
      "workspaceId": "Object with this ID does not exist.",
      "unknown_username": "Object with this ID does not exist.",
      "correct_username": "Json value should be UserRole type."
  }
  ```

+ 403

  ```json
  {
      "error": "Only admins can grant user permissions."
  }
  ```

## Project API

### Get all projects of a workspace

Path: /api/workspace/\<int:wid\>/projects

Method: GET

Response: 200

```json
[
    {
        "id": 1,
        "name": "Project-A",
        "description": "This is the project description",
        "workspaceId": 1,
        "owner": {
            "username": "userF",
            "email": "userf@gmail.com",
            "firstname": "Ffirst",
            "lastname": "Flast",
            "dateJoined": "2022-04-05T17:04:18.811803-04:00"
        },
        "createdAt": "2022-03-27T22:52:32.227527-04:00",
        "lastUpdatedAt": "2022-03-27T22:52:32.227529-04:00"
    },
    {
        "id": 2,
        "name": "Project-B",
        "description": "This is the project description",
        "workspaceId": 1,
        "owner": {
            "username": "userG",
            "email": "userg@gmail.com",
            "firstname": "Gfirst",
            "lastname": "Glast",
            "dateJoined": "2022-04-05T17:04:18.811803-04:00"
        },
        "createdAt": "2022-03-27T22:52:32.227972-04:00",
        "lastUpdatedAt": "2022-03-27T22:52:32.227973-04:00"
    }
]
```

### Create a new project

Path: /api/workspace/\<int:wid\>/projects

Method: POST

Request:

```json
{
    "name": "project name",  # required, non-blank
    "description": "project description"  # optional
}
```

Response: 

+ 201

  ```json
  {
      "id": 20,
      "name": "project name",
      "description": "project description",
      "workspaceId": 1,
      "owner": {
          "username": "userA",
          "email": "usera@gmail.com",
          "firstname": "Afirst",
          "lastname": "Alast",
          "dateJoined": "2022-04-05T17:04:18.811803-04:00"
      },
      "createdAt": "2022-04-01T22:31:29.895845-04:00",
      "lastUpdatedAt": "2022-04-01T22:31:29.895858-04:00"
  }
  ```

+ 400

  ```json
  {
      "name": "This field is required.",
      "description": "This field should be str type."
  }
  ```

### Get project by ID

Path: /api/project/\<int:pid\>

Method: GET

Response:

+ 200

  ```json
  {
      "id": 1,
      "name": "Project-A",
      "description": "This is the project description",
      "workspaceId": 1,
      "owner": {
          "username": "userF",
          "email": "userf@gmail.com",
          "firstname": "Ffirst",
          "lastname": "Flast",
          "dateJoined": "2022-04-05T17:04:18.811803-04:00"
      },
      "createdAt": "2022-03-27T22:52:32.227527-04:00",
      "lastUpdatedAt": "2022-03-27T22:52:32.227529-04:00"
  }
  ```

+ 404

### Update an existing project

Path: /api/project/\<int:pid\>

Method: PUT

Request:

```json
{
    "name": "project name",  # optional, non-blank
    "description": "project description"  # optional
}
```

Response: 

+ 200

  ```json
  {
      "id": 1,
      "name": "Project-A",
      "description": "project description",
      "workspaceId": 1,
      "owner": {
          "username": "userF",
          "email": "userf@gmail.com",
          "firstname": "Ffirst",
          "lastname": "Flast",
          "dateJoined": "2022-04-05T17:04:18.811803-04:00"
      },
      "createdAt": "2022-03-27T22:52:32.227527-04:00",
      "lastUpdatedAt": "2022-03-27T22:52:32.227529-04:00"
  }
  ```

+ 400

  ```json
  {
      "name": "This field should be str type."
  }
  ```

### Delete a project

Path: /api/project/\<int:pid\>

Method: DELETE

Response: 200

## Task API

### Get all tasks of a project

Path: /api/project/\<int:pid\>/tasks?visible=\<bool>

Method: GET

Request: optional query parameter `visible`, default value is `true`, set to `false` will show archived tasks.

Response: 200

```json
{
    "backlog": [
        {
            "id": 6,
            "type": "action",
            "priority": "low",
            "status": "backlog",
            "title": "Task-AAF",
            "description": "This is the task description",
            "projectId": 1,
            "assigneeId": "testuser-3",
            "reporterId": "testuser-1",
            "createdAt": "2022-04-06T14:21:42.110311-04:00",
            "lastUpdatedAt": "2022-04-06T14:21:42.110312-04:00",
            "watchers": ["user-a", "user-b", "user-c"],
            "visible": true
        },
        {
            "id": 8,
            "type": "action",
            "priority": "critical",
            "status": "backlog",
            "title": "Task-AAH",
            "description": "This is the task description",
            "projectId": 1,
            "assigneeId": "testuser-3",
            "reporterId": "testuser-3",
            "createdAt": "2022-04-06T14:21:42.110349-04:00",
            "lastUpdatedAt": "2022-04-06T14:21:42.110350-04:00",
            "watchers": ["user-a", "user-b", "user-c"],
            "visible": true
        }
    ],
    "todo": [
        {
            "id": 2,
            "type": "action",
            "priority": "low",
            "status": "todo",
            "title": "Task-AAB",
            "description": "This is the task description",
            "projectId": 1,
            "assigneeId": "testuser-3",
            "reporterId": "testuser-1",
            "createdAt": "2022-04-06T14:21:42.110234-04:00",
            "lastUpdatedAt": "2022-04-06T14:21:42.110235-04:00",
            "watchers": ["user-a", "user-b", "user-c"],
            "visible": true
        }
    ],
    "inprogress": [
        {
            "id": 5,
            "type": "story",
            "priority": "important",
            "status": "inprogress",
            "title": "Task-AAE",
            "description": "This is the task description",
            "projectId": 1,
            "assigneeId": "testuser-1",
            "reporterId": "testuser-3",
            "createdAt": "2022-04-06T14:21:42.110292-04:00",
            "lastUpdatedAt": "2022-04-06T14:21:42.110293-04:00",
            "watchers": ["user-a", "user-b", "user-c"],
            "visible": true
        }
    ],
    "done": [
        {
            "id": 1,
            "type": "action",
            "priority": "important",
            "status": "done",
            "title": "Task-AAA",
            "description": "This is the task",
            "projectId": 1,
            "assigneeId": "testuser-1",
            "reporterId": "testuser-3",
            "createdAt": "2022-04-06T14:21:42.110210-04:00",
            "lastUpdatedAt": "2022-04-06T16:44:45.064937-04:00",
            "watchers": ["user-a", "user-b", "user-c"],
            "visible": true
        }
    ]
}
```

### Create a new task

Path: /api/project/\<int:pid\>/tasks

Method: POST

Request:

```json
{
    "type": "story",  # required
    "priority": "critical",  # optional, default normal
    "status": "todo",  # optional, default backlog
    "title": "task title",  # required, non-blank
    "description": "task description",  # optional
    "assigneeId": "userA",  # required, non-blank
    "reporterId": "userB"  # required, non-blank
}
```

Response: 

+ 201

  ```json
  {
      "id": 69,
      "type": "story",
      "priority": "critical",
      "status": "todo",
      "title": "task title",
      "description": "task description",
      "projectId": 1,
      "assigneeId": "userA",
      "reporterId": "userB",
      "createdAt": "2022-04-01T22:42:41.664073-04:00",
      "lastUpdatedAt": "2022-04-01T22:42:41.664085-04:00",
      "watchers": ["userA", "userB"],
      "visible": true
  }
  ```

+ 400

  ```json
  {
      "status": "This field should be TaskStatus type.",
      "title": "This string field cannot be blank.",
      "assigneeId": "Object with this ID does not exist."
  }
  ```

### Get task detail by ID

Path: /api/task/\<int:tid\>

Method: GET

Response:

+ 200

  ```json
  {
      "id": 5,
      "type": "story",
      "priority": "critical",
      "status": "backlog",
      "title": "Task-4",
      "description": "This is the task description",
      "project": {
          "id": 1,
          "name": "Project-A",
          "description": "project description",
          "workspaceId": 1,
          "owner": {
              "username": "userF",
              "email": "userf@gmail.com",
              "firstname": "Ffirst",
              "lastname": "Flast",
              "dateJoined": "2022-04-05T17:04:18.811803-04:00"
          },
          "createdAt": "2022-03-27T22:52:32.227527-04:00",
          "lastUpdatedAt": "2022-03-27T22:52:32.227529-04:00"
      },
      "assignee": {
          "username": "userD",
          "email": "userd@gmail.com",
          "firstname": "Dfirst",
          "lastname": "Dlast",
          "dateJoined": "2022-04-05T17:04:18.811803-04:00"
      },
      "reporter": {
          "username": "userE",
          "email": "usere@gmail.com",
          "firstname": "Efirst",
          "lastname": "Elast",
          "dateJoined": "2022-04-05T17:04:18.811803-04:00"
      },
      "createdAt": "2022-03-27T22:52:32.231983-04:00",
      "lastUpdatedAt": "2022-03-27T22:52:32.231984-04:00",
      "watchers": ["userA", "userB", "userC"],
      "visible": true,
      "comments": [
          {
              "id": 6,
              "taskId": 5,
              "user": {
                  "username": "userB",
                  "email": "userb@gmail.com",
                  "firstname": "Bfirst",
                  "lastname": "Blast",
                  "dateJoined": "2022-04-05T17:04:18.811803-04:00"
              },
              "content": "This is a task comment",
              "createdAt": "2022-03-27T22:52:32.256010-04:00",
              "lastUpdatedAt": "2022-03-27T22:52:32.256010-04:00"
          },
          {
              "id": 7,
              "taskId": 5,
              "user": {
                  "username": "userB",
                  "email": "userb@gmail.com",
                  "firstname": "Bfirst",
                  "lastname": "Blast",
                  "dateJoined": "2022-04-05T17:04:18.811803-04:00"
              },
              "content": "This is a task comment",
              "createdAt": "2022-03-27T22:52:32.256339-04:00",
              "lastUpdatedAt": "2022-03-27T22:52:32.256340-04:00"
          }
      ]
  }
  ```

+ 404

### Update an existing task

Path: /api/task/\<int:tid\>

Method: PUT

Request:

```json
{
    "type": "story",  # optional
    "priority": "critical",  # optional
    "status": "todo",  # optional
    "title": "task title",  # optional, non-blank
    "description": "task description",  # optional
    "assigneeId": "userA",  # optional, non-blank
    "reporterId": "userB",  # optional, non-blank
    "visible": false  # optional
}
```

Response: 

+ 200

  ```json
  {
      "id": 5,
      "type": "story",
      "priority": "critical",
      "status": "backlog",
      "title": "task title",
      "description": "This is the task description",
      "projectId": 1,
      "assigneeId": "userA",
      "reporterId": "userB",
      "createdAt": "2022-03-27T22:52:32.231983-04:00",
      "lastUpdatedAt": "2022-03-27T22:52:32.231984-04:00",
      "watchers": ["userA", "userB", "userC"],
      "visible": true
  }
  ```

+ 400

  ```json
  {
      "status": "This field should be TaskStatus type.",
      "title": "This field should be str type.",
      "assigneeId": "Object with this ID does not exist."
  }
  ```

### Delete a task

Path: /api/task/\<int:tid\>

Method: DELETE

Response: 200

## Comment API

### Create a new comment

Path: /api/task/\<int:tid\>/comments

Method: POST

Request:

```json
{
    "content": "my comment"  # required, non-blank
}
```

Response: 

+ 201

  ```json
  {
      "id": 89,
      "taskId": 5,
      "user": {
          "username": "userA",
          "email": "usera@gmail.com",
          "firstname": "Afirst",
          "lastname": "Alast",
          "dateJoined": "2022-04-05T17:04:18.811803-04:00"
      },
      "content": "my comment",
      "createdAt": "2022-04-01T22:51:27.687439-04:00",
      "lastUpdatedAt": "2022-04-01T22:51:27.687448-04:00"
  }
  ```

+ 400

  ```json
  {
      "content": "This field is required."
  }
  ```

### Update an existing comment

Path: /api/comment/\<int:cid\>

Method: PUT

Request:

```json
{
    "content": "edited comment"  # optional, non-blank
}
```

Response: 

+ 200

  ```json
  {
      "id": 85,
      "taskId": 1,
      "user": {
          "username": "userA",
          "email": "usera@gmail.com",
          "firstname": "Afirst",
          "lastname": "Alast",
          "dateJoined": "2022-04-05T17:04:18.811803-04:00"
      },
      "content": "edited comment",
      "createdAt": "2022-04-05T17:45:46.250770-04:00",
      "lastUpdatedAt": "2022-04-05T17:47:01.438142-04:00"
  }
  ```

+ 400

  ```json
  {
      "content": "This string field cannot be blank.",
      "user": "Only the original commenter can edit."
  }
  ```

### Delete a comment

Path: /api/comment/\<int:cid\>

Method: DELETE

Response: 

+ 200

+ 403

  ```json
  {
      "error": "Only the original commenter can delete."
  }
  ```

## Notification API

> Note: Notification APIs will bypass the user permission check mentioned at the beginning, even they use POST/PUT/DELETE methods.

### Watch a task

Path: /api/task/\<int:tid\>/watchers

Method: POST

Response: 

+ 200
+ 404

### Unwatch a task

Path: /api/task/\<int:tid\>/watchers

Method: DELETE

Response:

+ 200

+ 404

+ 403

  ```json
  {
      "error": "Task assignee and reporter cannot unwatch."
  }
  ```

### Pull user messages

Path: /api/messages

Method: GET

Response: 200

```json
[
    {
        "type": "TaskCreated",
        "operator": "User B",
        "subject": "Workspace-1, Project-1, SampleTask-2",
        "changelist": {
            "type": "issue",
            "status": "todo",
            "priority": "normal",
            "description": "task description",
            "assignee": "user-a",
            "reporter": "user-b"
        },
        "timestamp": "2022-04-11 02:22:46.635001+00:00",
        "id": "807870fc-c435-4d57-8c51-2649efe2514b"
    },
    {
        "type": "TaskUpdated",
        "operator": "User C",
        "subject": "Workspace-1, Project-1, SampleTask-1",
        "changelist": {
            "title": "SampleTask-1",
            "description": "a new description"
        },
        "timestamp": "2022-04-11 02:20:10.046862+00:00",
        "id": "4c13aaf2-dc79-4f6c-bf83-fde4126b74f9"
    },
    {
        "type": "TaskDeleted",
        "operator": "User D",
        "subject": "Workspace-1, Project-1, SampleTask-3",
        "timestamp": "2022-04-11 21:01:34.658551+00:00",
        "id": "6cb09fed-05c4-469a-8b49-ca1e08f8fa0d"
    },
    {
        "type": "Permission",
        "operator": "User C",
        "subject": "Your new user role at Workspace-1 is EDITOR",
        "timestamp": "2022-04-11 02:18:59.117360+00:00",
        "id": "56b89e6a-a785-4cfa-8de3-6ef5215076cc"
    }
]
```

### Ack user messages

Path: /api/messages

Method: DELETE

Request:

```json
# required format: a list of message IDs
[
    "f29a0f0f-2f36-4efc-91f6-4796b4b6cfa7",
    "56b89e6a-a785-4cfa-8de3-6ef5215076cc",
    "187ab02b-aad1-4b8d-a511-aa5058ea88e5"
]
```

Response:

+ 200

+ 400

  ```json
  {
      "error": "Json payload should be a list of string IDs."
  }
  ```

