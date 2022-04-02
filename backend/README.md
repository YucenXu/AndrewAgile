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
    },
    {
        "username": "userC",
        "email": "userc@gmail.com",
        "firstname": "Cfirst",
        "lastname": "Clast"
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

## Project

### Create a new project

