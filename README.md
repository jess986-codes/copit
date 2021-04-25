# Copit
=== Created in 2020 ===
In response to Covid-19 one-person-rule, made it easier to turn selected groceries into a shopping list, which can be readily copied to your nominated shopper. 

In the absence of a Coles API, I created a web-scrapping program using Puppeteer. This was used to extract the weekly specials into a MySQL database.

The focus of this site was not to make it look good, but to understand the backend processing and giving the site functionality. It was something I wanted to make quickly in order to achieve the goal of collecting a list of supermarket specials. To this day, I still use it and even though I haven't yet implemented everything or sorted the products categorically, it's a joy to use knowing that I made this all from scratch.

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
