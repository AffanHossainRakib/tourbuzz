# 🚀 TourBuzz Project

Welcome to the **TourBuzz** project! This repository is designed to help you set up your development environment seamlessly. Follow the steps below to get started quickly.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) 
- [XAMPP](https://www.apachefriends.org/index.html)

## 🛠️ Setting Up the Project for the First Time

Follow these steps to set up the project:

1. **Clone the Repository**
```bash
git clone <repository-url>
```

2. Open the project in a code editor, i.e. VSCode.

3. Open a **terminal** in the **root directory** of the project, if you are using VSCode, try this shortcut to open a terminal
```bash
Ctrl + Shift + `
```

4. **Install the necessary Node packages** by running the following command:
```bash
   npm install
```
*It might take a while to download all the node packages for the first run.*

5. Open XAMPP, start Apache, & MySQL.


# If you don’t have a password set for MySQL, follow this.

6. First login by,
```shell
mysql -u root -p
```
For the password just press enter

7. Then set passwordby,
```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Pass123123@@';
```
8. Then do flush prvilileges
```
FLUSH PRIVILEGES;
```
9. Go to this location 
```
C:\xampp\phpMyAdmin
``` 
and edit the *config.inc.php* file accordingly.
Change this 
```
$cfg['Servers'][$i]['password'] = '';
```
to this 
```
$cfg['Servers'][$i]['password'] = 'Pass123123@@';
```
10. Now on the XAMPP control panel click on **Admin** in the MySQL row. It will
open admin panel in the browser.

11. Click on New to create a new **Database** give name 
```tourbuzz1```
12. Now go to import, and import the ```DBCreation.sql``` file from the Project Directory.
13. Now on that terminal opened in the Code Editor, change directory to
```cd src/server/```
Then run,
```shell
node server.js
```


14. Open another terminal by Ctrl + Shift + ` and this time give the command
```shell
npm start
```

*Caution: It might take some time in every step to set up for the first time.*

