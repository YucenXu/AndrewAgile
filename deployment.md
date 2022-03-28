# Deployment

## Cloud instance

Choose an IaaS provider, for example [AWS EC2](https://aws.amazon.com/ec2/), and create a new Ubuntu instance.

Connect to the instance and install dependent packages.

```shell
sudo apt update
sudo apt upgrade

# python and django
sudo -H apt install python3-pip
sudo -H pip3 install django
sudo -H pip3 install social-auth-app-django

# npm and react
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install node
nvm use node

# mysql database
sudo apt install mysql-server
sudo apt install libmysqlclient-dev
sudo -H pip3 install mysqlclient

# apache server
sudo apt install apache2 
sudo apt install libapache2-mod-wsgi-py3

sudo reboot
```

## MySQL database

Create a MySQL admin and the project database.

```shell
sudo mysql
```

```mysql
create user <username>@localhost identified by <password>;
grant all privileges on *.* to <username>@localhost;
create database django character set utf8mb4;
# drop database django;
quit;
```

Login to the database and perform CRUD operations (if needed).

```shell
mysql -u <username> -p
```

```mysql
use django;
show tables;
select * from <tablename>;
quit;
```

## Frontend & backend 

Git clone this repository under current directory `/home/ubuntu/`.

Build the frontend app for production. Then move the build folder to backend directory.

```shell
cd s22_team_26/frontend
npm install
npm run build
rm -rf ../backend/ui_build && mv build ../backend/ui_build
```

Replace the default database engine with MySQL in [settings.py](backend/backend/settings.py).

```python
DATABASES = {
    'default': {
        'OPTIONS': {'charset': 'utf8mb4'},
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django',
        'USER': CONFIG.get("MySQL", "user"),
        'PASSWORD': CONFIG.get("MySQL", "password"),
    }
}
```

Migrate the backend database and collect static files.

```shell
cd s22_team_26/backend
python3 manage.py makemigrations userapp agileapp
python3 manage.py migrate
# python3 manage.py shell < backend/init_db.py
python3 manage.py collectstatic
```

## Config networks

Purchase a domain name at [GoDaddy](https://www.godaddy.com/), set your instance's public IP address in the "Type A" DNS record.

Add an inbound security rule for the instance: protocol TCP, port 80, allowed source 0.0.0.0/0

Add your purchased hostname to the `ALLOWED_HOSTS` list in [settings.py](backend/backend/settings.py).

## Google OAuth2

The project uses Google OAuth2 as the authentication protocol. Go to [GCP console](https://console.cloud.google.com/) and create a new project.

Visit "APIs & Services -> OAuth consent screen", create an external app.

Visit "APIs & Services -> Credentials", create an OAuth client ID of "Web application" type.

Add one entry to "Authorized redirect URIs": `http://<hostname>/oauth/complete/google-oauth2/`

> Note: It may take 5 minutes to a few hours for the Google OAuth2 setting to take effect.

## Config secrets

Make a copy of the [config.ini.sample](backend/config.ini.sample) file and rename the copy as `config.ini`.

Update with your own secrets for Django, GoogleOAuth2 and MySQL in `config.ini`.

Finally, switch the configuration file to the production version in [settings.py](backend/backend/settings.py).

```python
CONFIG.read(BASE_DIR / "config.ini")
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

Now the web app should be running at `http://<hostname>/`.

