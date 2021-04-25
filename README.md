# Copit
=== Created in 2020 ===\
In response to Covid-19 one-person-rule, made it easier to turn selected groceries into a shopping list, which can be readily copied to your nominated shopper. 

In the absence of a Coles API, I created a web-scrapping program using Puppeteer. This was used to extract the weekly specials into a MySQL database.

The focus of this site was not to make it look good, but to understand the backend processing and giving the site functionality. It was something I wanted to make quickly in order to achieve the goal of collecting a list of supermarket specials. To this day, I still use it and even though I haven't yet implemented everything or sorted the products categorically, it's a joy to use knowing that I made this all from scratch.

## How to setup
1. Node.js installed through one of the following:
```
a) download for your OS here: https://nodejs.org/en/download/
b) using homebrew on Linux: brew install node
```
2. Ensure the path to Node.js is in your PATH environment variables under user and system variables.\
Instructions here: https://love2dev.com/blog/node-is-not-recognized-as-an-internal-or-external-command/
3. In command line, navigate to the directory where app.js is and input the following:```npm install```
4. Then navigate to the webscrapper folder and input the following again:```npm install```
5. Ensure MySql is installed on your device. Instructions on how to are here: https://dev.mysql.com/doc/refman/8.0/en/installing.html
6. In installing MySql, you will be asked to create a password for your root user. In config/default.json and webscrapper/config/default.json - place that same password where it says "REPLACE-WITH-YOUR-OWN-PASSWORD".
8. Set up the "products" database\
start mySql server (you will be prompted for the password you made previously):
```
mysql -u root -p
```
change mySql authentication method:
```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your-root-user-password'

```
```
flush privileges;
```
create a database:
```
CREATE DATABASE coles;
```
select "coles" database for use:
```
USE coles;
```
create a "products" table to store all our product information:
```
CREATE TABLE IF NOT EXISTS products (
prodID INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(256) UNIQUE NOT NULL,
price DECIMAL(5,2),
unit VARCHAR(4),
image VARCHAR(8000) NOT NULL,
special TINYINT(1) NOT NULL DEFAULT 0
);
```
## Time to run
1. The first thing you MUST do is navigating to the webscrapper folder and run the webscrapping program :
```
node webscrapper.js
```
>👉 **_NOTE:_** When the new specials come out (Wednesday), run the webscrapping program again to update the "products" table.

2.  navigate back to where app.js is and run it:
```
node app.js
```
3. In a browser window, paste the following in the URL bar:

```
http://localhost:3000/
```

## How it should look
![Screen Shot 2021-04-25 at 1 07 20 pm](https://user-images.githubusercontent.com/57920696/115982154-370e3c00-a5dc-11eb-8d64-2e4d5c069ee9.png)

![Screen Shot 2021-04-25 at 1 07 27 pm](https://user-images.githubusercontent.com/57920696/115982163-44c3c180-a5dc-11eb-93c2-de35cc5ae8b2.png)

Once the copy button in the "shopping list" is clicked, the resulting paste (ctrl + v / cmd + v) is:
```
o The Natural Confectionery Co. Family Bag 200g-260g
o La Española Olive Oil 1 Litre
o The Natural Cracker Co. Crispy Crackers 160g
o Garnier Fructis Shampoo or Conditioner 850mL

Total Cost: $18.75
```
You can paste this list into your notes, send this to someone through your instant messager or send it through using your good 'ol email.
>👉 **_NOTE:_** The shopping list buttons do not work yet, except for the copy function. Another way of removing the items is to click on selected product again 🙂
