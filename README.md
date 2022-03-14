# 17637 S22 Team 26 - Andrew Agile Platform

## Overview

A web application serves as an agile platform, with similar functionalities as Jira and Trello.

Tech stack: [Django](https://www.djangoproject.com/), [React](https://reactjs.org/), [Material-UI](https://mui.com/)

## Dependency

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
   python3 manage.py makemigrations
   python3 manage.py migrate
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


## Production

1. Choose an IaaS provider, for example [AWS EC2](https://aws.amazon.com/ec2/), and create a new instance.

1. Add an inbound security rule for the instance: `protocol TCP, port 80, allowed source 0.0.0.0/0`

3. Install dependent packages within the instance.

   ```shell
   sudo apt update
   sudo apt upgrade
   
   sudo -H apt install python3-pip
   sudo -H pip3 install django
   
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   nvm install node
   nvm use node
   
   sudo apt install apache2 
   sudo apt install libapache2-mod-wsgi-py3
   
   sudo reboot
   ```

1. Git clone this repository under current directory.

5. Build the frontend app for production. Then move the build folder to the backend directory.

   ```shell
   cd s22_team_26/frontend
   npm install
   npm run build
   rm -rf ../backend/ui_build && mv build ../backend/ui_build
   ```

6. Initialize the backend database and collect static files.

   ```shell
   cd s22_team_26/backend
   python3 manage.py makemigrations
   python3 manage.py migrate
   python3 manage.py collectstatic
   ```

7. Add your instance's public IP address to the `ALLOWED_HOSTS` list in `s22_team_26/backend/backend/settings.py` line 27.

8. Configure the Apache HTTP server.

   ```shell
   sudo vim /etc/apache2/apache2.conf
   ```

   + Comment out default mapping for "/" url at line 159.

     ```
     # <Directory />
     #     Options FollowSymLinks
     #     AllowOverride None
     #     Require all denied
     # </Directory>
     ```

   + Set script alias for "/" url and the project path.

     ```
     WSGIScriptAlias / /home/ubuntu/s22_team_26/backend/backend/wsgi.py
     WSGIPythonPath /home/ubuntu/s22_team_26/backend
     ```

   + Add permissions for the project directory files.

     ```
     <Directory /home/ubuntu/s22_team_26/backend>
         <Files wsgi.py>
             Require all granted
         </Files>
     </Directory>
     ```

   + Add alias and permissions for static folder.

     ```
     Alias /static /home/ubuntu/s22_team_26/backend/staticfiles
     
     <Directory /home/ubuntu/s22_team_26/backend/staticfiles>
         Order allow,deny
         Allow from all
     </Directory>
     ```

9. Fix permissions on the directories and restart Apache server.

   ```shell
   sudo chgrp -R www-data s22_team_26/backend
   sudo chmod -R g+w s22_team_26/backend
   sudo apache2ctl restart
   ```
   Now the web app should be running at `http://<ip-address>/`.

## Developers

+ Nianyi Guo
+ [Yucen Xu](https://github.com/YucenXu)
+ Zhiqi Li 
+ [Peng Zhao](https://github.com/zp9763)

## Acknowledge

We used some Django code from professor's class demos.

We used some template code from [MUI examples](https://github.com/mui/material-ui/tree/master/docs/data/material/getting-started/templates).

We referred to [EC2-Django-Guide](https://canvas.cmu.edu/courses/27323/files/7787426?module_item_id=5020227) when deploying the web app.
