# 17637 S22 Team 26 - Andrew Agile Platform

## Overview

A web application serves as an agile platform, with similar functionalities as Jira and Trello.

Tech stack: [Django](https://www.djangoproject.com/), [React](https://reactjs.org/), [Material-UI](https://mui.com/)

## Requirements

Suggested package versions, can be slightly different.

+ python 3.9.2
+ django 4.0
+ node 17.6.0
+ npm 8.5.1
+ react 17.0.2
+ axios 0.26.0
+ mui 5.5.0 

## Local Dev

1. Initialize the backend database, rerun if models are changed.

   ```shell
   cd backend
   python manage.py makemigrations
   python manage.py migrate
   ```

2. Start the backend server, code changes will trigger reload.

   ```shell
   cd backend
   python manage.py runserver
   ```

3. Install frontend node packages.

   ```shell
   cd frontend
   npm install
   ```

4. Start the frontend app, code changes will trigger reload.

   ```shell
   cd frontend
   npm start
   ```

4. Open browser at http://localhost:3000/ to test.

## Production

1. Builds the frontend app for production.

   ```shell
   cd frontend
   npm run build
   ```

2. Move build to the backend directory.

   ```shell
   cd frontend
   rm -rf ../backend/ui_build && mv build ../backend/ui_build
   ```

3. Start the backend server at http://localhost:8000/

4. More details of AWS deployment: [EC2-Django-Guide.pdf](https://canvas.cmu.edu/courses/27323/files/7787426?module_item_id=5020227)

## Developers

+ Nianyi Guo
+ Yucen Xu
+ Zhiqi Li 
+ [Peng Zhao](https://github.com/zp9763)

## Acknowledge

We use some Django code from professor's class demos.

We use some template code from [MUI examples](https://github.com/mui/material-ui/tree/master/docs/data/material/getting-started/templates).

