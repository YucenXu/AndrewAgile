# Deployment

1. Choose an IaaS provider, for example [AWS EC2](https://aws.amazon.com/ec2/), and create a new Ubuntu instance.

2. Add an inbound security rule for the instance: `protocol TCP, port 80, allowed source 0.0.0.0/0`

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

4. Git clone this repository under current directory.

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