# Deployment

## AWS EC2

Create a new Ubuntu instance on [AWS EC2](https://aws.amazon.com/ec2/). Connect to the instance and install dependencies.

```shell
sudo apt update
sudo apt upgrade

# python and django
sudo -H apt install python3-pip
sudo -H pip3 install django
sudo -H pip3 install social-auth-app-django
sudo -H pip3 install djangorestframework

# mysql client
sudo apt install libmysqlclient-dev
sudo -H pip3 install mysqlclient
sudo apt install mysql-client-core-8.0

# apache server
sudo apt install apache2
sudo apt install libapache2-mod-wsgi-py3

# ssl certificate
sudo -H apt-get install python3-certbot-apache

sudo reboot
```

Purchase a domain name at [GoDaddy](https://www.godaddy.com/), set your instance's public IP address in the "Type A" DNS record.

Choose an arbitrary hostname, for example "www" to your purchased domain name to form your **fully qualified domain name** `<hostname>.<domain-name>`. 

Add two inbound security rules in the EC2 instance:

+ type HTTP, port 80, allowed source 0.0.0.0/0
+ type HTTPS, port 443, allowed source 0.0.0.0/0

## AWS RDS

Create a new (or using exist) MySQL instance on [AWS RDS](https://aws.amazon.com/rds/).

Add one inbound security rule in the RDS instance: type MYSQL/Aurora, port 3306, allowed source should be the security group of your EC2 instance.

Then connect to RDS within EC2 to create a new database for this project.

```shell
mysql -h <host> -P 3306 -u <user> -p
# prompt for password
```

```mysql
create database django character set utf8mb4;
quit;
```

## Google OAuth2

The project uses Google OAuth2 as the authentication protocol. Go to [GCP console](https://console.cloud.google.com/) and create a new project.

Visit "APIs & Services -> OAuth consent screen", create an external app.

Visit "APIs & Services -> Credentials", create an OAuth client ID of "Web application" type.

Add two entries to "Authorized redirect URIs":

+  `http://<full-domain-name>/oauth/complete/google-oauth2/`
+  `https://<full-domain-name>/oauth/complete/google-oauth2/`

> Note: It may take 5 minutes to a few hours for the Google OAuth2 setting to take effect.

## Frontend

In your local dev environment, build the React bundle in production mode.

```shell
cd s22_team_26/frontend
npm install
npm run build
rm -rf ../backend/ui_build && mv build ../backend/ui_build
```

Push all the UI changes to the GitHub repository.

```shell
cd s22_team_26
git add .
git commit -m "update UI build"
git push
```

## Backend

In EC2 instance, git clone the repository under current directory `/home/ubuntu/`.

Make a few changes to [settings.py](backend/backend/settings.py):

+ Add the full domain name to the `ALLOWED_HOSTS` list.

+ Replace the default database engine with MySQL.

  ```python
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.mysql',
          'OPTIONS': {'charset': 'utf8mb4', 'sql_mode': 'traditional'},
          'NAME': 'django',
          'USER': CONFIG.get("MySQL", "user"),
          'PASSWORD': CONFIG.get("MySQL", "password"),
          'HOST': CONFIG.get("MySQL", "host"),
          'PORT': CONFIG.get("MySQL", "port"),
      }
  }
  ```

+ Make a copy of the [config.ini.sample](backend/config.ini.sample) file and rename the copy as `config.ini`.

  Update with your own secrets for Django, GoogleOAuth2 and MySQL in `config.ini`.

  Switch the configuration file to the production version.
  
  ```python
  CONFIG.read(BASE_DIR / "config.ini")
  ```

Finally, migrate the backend database and collect static files.

```shell
cd s22_team_26/backend
python3 manage.py makemigrations agileapp
python3 manage.py migrate
# python3 manage.py shell < agileapp/init_db.py
python3 manage.py collectstatic
```

## Apache server

Edit the Apache HTTP server's config file.

```shell
sudo vim /etc/apache2/apache2.conf
```

Comment out default mapping for "/" url at line 159.

```
# <Directory />
#     Options FollowSymLinks
#     AllowOverride None
#     Require all denied
# </Directory>
```

Set script alias for "/" url and the project path.

```
WSGIScriptAlias / /home/ubuntu/s22_team_26/backend/backend/wsgi.py
WSGIPythonPath /home/ubuntu/s22_team_26/backend
```

Add permissions for the project directory files.

```
<Directory /home/ubuntu/s22_team_26/backend>
    <Files wsgi.py>
        Require all granted
    </Files>
</Directory>
```

Add alias and permissions for static folder.

```
Alias /static /home/ubuntu/s22_team_26/backend/staticfiles

<Directory /home/ubuntu/s22_team_26/backend/staticfiles>
    Order allow,deny
    Allow from all
</Directory>
```

Fix permissions on the directories and restart Apache server.

```shell
cd /home/ubuntu
sudo chgrp -R www-data s22_team_26/backend
sudo chmod -R g+w s22_team_26/backend
sudo apache2ctl restart
```

Now the web app should be running at `http://<full-domain-name>/`.

## HTTPS

Create a SSL certificate file provided by a CA.

```shell
sudo -H certbot --apache
# prompt for your full domain name and traffic direction choice
# better to choose option 1 to facilitate debugging

sudo a2enmod ssl
cd /etc/apache2/sites-enabled
sudo ln -s ../sites-available/default-ssl.conf
```

Edit the SSL configuration file.

```shell
sudo vim /etc/apache2/sites-available/default-ssl.conf
```

Set the server parameters and remember the SSLCertificate path.

```
ServerName  <full-domain-name>
ServerAlias  <domain-name>
SSLCertificateFile  <cert-path>/...
SSLCertificateKeyFile  <cert-path>/...
```

Fix permissions on the cert directory and restart Apache server.

```shell
sudo chgrp -R www-data <cert-path>
sudo apache2ctl restart
```

Now the web app should be running at `https://<full-domain-name>/`.

