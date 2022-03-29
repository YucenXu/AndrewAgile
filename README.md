# 17637 S22 Team 26 - [AndrewAgile](https://www.andrewagile.com/)

## Overview

A web application serves as an agile platform, with similar functionalities as Jira and Trello.

Tech stack: [Django](https://www.djangoproject.com/), [React](https://reactjs.org/), [Material-UI](https://mui.com/)

## Dependency

Suggested package versions, can be slightly different.

+ python 3.9.2
  + django 4.0
  + social-auth-app-django 5.0.0

+ node 17.6.0
+ npm 8.5.1

## Local Dev

1. Initialize the backend database, rerun if models are changed.

   ```shell
   cd backend
   python3 manage.py makemigrations userapp agileapp
   python3 manage.py migrate
   python3 manage.py shell < backend/init_db.py
   ```

2. Start the backend server, code changes will trigger reload.

   ```shell
   cd backend
   python3 manage.py runserver
   ```

3. Install frontend node packages. Then start the frontend app, code changes will trigger reload.

   ```shell
   cd frontend
   npm install
   npm start
   ```

4. Open browser at http://localhost:3000/ to develop and test.

> Note: If you are logged out at localhost:3000, please go to localhost:8000 to login again.
>
> Then return to localhost:3000 for frontend development.


## Production

See the [deployment guide](deployment.md) for details.

## Developers

+ [Nianyi Guo](https://github.com/jujujulia123)
+ [Yucen Xu](https://github.com/YucenXu)
+ [Zhiqi Li](https://github.com/Angelica-Lee) 
+ [Peng Zhao](https://github.com/zp9763)

## Acknowledge

We used some Django code from Professor Eppinger's class demos.

We used some MUI template code from their official documentation.

