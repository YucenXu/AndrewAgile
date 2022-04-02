# Backend API spec

[TOC]

## User

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
      "lastname": "Alast"
  }
  ```

+ 401

### Get all users

Path: /api/users

Method: GET

Response: 200

```json
[
    {
        "username": "userA",
        "email": "usera@gmail.com",
        "firstname": "Afirst",
        "lastname": "Alast"
    },
    {
        "username": "userB",
        "email": "userb@gmail.com",
        "firstname": "Bfirst",
        "lastname": "Blast"
    }
]
```

### Get user by ID (username)

Path: /api/user/\<str:uid\>

Method: GET

Response:

+ 200

  ```json
  {
      "username": "userA",
      "email": "usera@gmail.com",
      "firstname": "Afirst",
      "lastname": "Alast"
  }
  ```

+ 404

## Workspace

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

## Project

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
            "lastname": "Flast"
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
            "lastname": "Glast"
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

```python
{
    "name": "project name",  # required
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
          "lastname": "Alast"
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
          "lastname": "Flast"
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

```python
{
    "name": "project name",  # optional
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
          "lastname": "Flast"
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

## Task

### Get all tasks of a project

Path: /api/project/\<int:pid\>/tasks

Method: GET

Response: 200

```json
[
    {
        "id": 1,
        "type": "story",
        "priority": "important",
        "status": "todo",
        "title": "Task-0",
        "description": "This is the task description",
        "projectId": 1,
        "assigneeId": "userE",
        "reporterId": "userD",
        "createdAt": "2022-03-27T22:52:32.229749-04:00",
        "lastUpdatedAt": "2022-03-27T22:52:32.229750-04:00"
    },
    {
        "id": 2,
        "type": "issue",
        "priority": "critical",
        "status": "todo",
        "title": "Task-1",
        "description": "This is the task description",
        "projectId": 1,
        "assigneeId": "userE",
        "reporterId": "userF",
        "createdAt": "2022-03-27T22:52:32.230215-04:00",
        "lastUpdatedAt": "2022-03-27T22:52:32.230216-04:00"
    }
]
```

### Create a new task

Path: /api/project/\<int:pid\>/tasks

Method: POST

Request:

```python
{
    "type": "story",  # required
    "priority": "critical",  # optional, default normal
    "status": "todo",  # optional, default backlog
    "title": "task title",  # required
    "description": "task description",  # optional
    "assigneeId": "userA",  # required
    "reporterId": "userB"  # required
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
      "lastUpdatedAt": "2022-04-01T22:42:41.664085-04:00"
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

### Get task by ID

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
              "lastname": "Flast"
          },
          "createdAt": "2022-03-27T22:52:32.227527-04:00",
          "lastUpdatedAt": "2022-03-27T22:52:32.227529-04:00"
      },
      "assignee": {
          "username": "userD",
          "email": "userd@gmail.com",
          "firstname": "Dfirst",
          "lastname": "Dlast"
      },
      "reporter": {
          "username": "userE",
          "email": "usere@gmail.com",
          "firstname": "Efirst",
          "lastname": "Elast"
      },
      "createdAt": "2022-03-27T22:52:32.231983-04:00",
      "lastUpdatedAt": "2022-03-27T22:52:32.231984-04:00",
      "comments": [
          {
              "id": 6,
              "taskId": 5,
              "user": {
                  "username": "userB",
                  "email": "userb@gmail.com",
                  "firstname": "Bfirst",
                  "lastname": "Blast"
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
                  "lastname": "Blast"
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

```python
{
    "type": "story",  # optional
    "priority": "critical",  # optional
    "status": "todo",  # optional
    "title": "task title",  # optional
    "description": "task description",  # optional
    "assigneeId": "userA",  # optional
    "reporterId": "userB"  # optional
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
      "lastUpdatedAt": "2022-03-27T22:52:32.231984-04:00"
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

### Delete a project

Path: /api/task/\<int:tid\>

Method: DELETE

Response: 200

## Comment

### Create a new comment

Path: /api/task/\<int:tid\>/comments

Method: POST

Request:

```python
{
    "content": "my comment"  # required
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
          "lastname": "Alast"
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

