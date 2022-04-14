# 17637 S22 Team 26 [AndrewAgile](https://www.andrewagile.com/)

## Overview

A web application serves as an agile platform, with similar functionalities as Jira and Trello.

**Tech stack: Django, React, Material-UI, MySQL, Redis**

## Documentation

+ [Backend API spec](backend/README.md)
+ [Deployment guide](deployment.md)

## Requirements

Suggested package versions, can be slightly different.

+ python 3.8+
  + django 4.0+
  + social-auth-app-django 5.0.x
  + djangorestframework 3.13.x
  + redis-py 4.2.x
  
+ node 17.6+
+ npm 8.5+
+ redis 6.2+

## Local Dev

1. Start the local Redis server. Use the command line interface if needed.

   ```shell
   redis-server
   # redis-cli
   ```

2. Initialize the backend database, rerun if models are changed.

   ```shell
   cd backend
   python3 manage.py makemigrations agileapp
   python3 manage.py migrate
   python3 manage.py shell < agileapp/init_db.py
   ```

3. Start the backend server, code changes will trigger reload.

   ```shell
   cd backend
   python3 manage.py runserver
   ```

4. Install frontend node packages. Then start the frontend app, code changes will trigger reload.

   ```shell
   cd frontend
   npm install
   npm start
   ```

5. Open browser at http://localhost:3000/ to develop and test.

> Note: If you are logged out at localhost:3000, please go to localhost:8000 to login again.
>
> Then return to localhost:3000 for frontend development.

## Developers

+ [Nianyi Guo](https://github.com/jujujulia123)
+ [Yucen Xu](https://github.com/YucenXu)
+ [Zhiqi Li](https://github.com/Angelica-Lee) 
+ [Peng Zhao](https://github.com/zp9763)

## Acknowledge

We used some Django code from Professor Eppinger's class demos.

We used some MUI template code from their official documentation.

