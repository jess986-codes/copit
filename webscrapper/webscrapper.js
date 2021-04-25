const puppeteer = require('puppeteer');
const chalk = require('chalk');
const db = require('mysql');
const config = require('config');

const error = chalk.bold.red;
const success = chalk.keyword("green");
const dbConfig = config.get('Products.dbConfig');

getSpecials();

async function getSpecials() {
  try {
    
    // filepath to store screenshot 
    let location = __dirname + "/images/new.png";
    
    // open the headless browser
    let browser = await puppeteer.launch({ headless: true });
    // open a new page
    let page = await browser.newPage();
    console.log("page created");
    // enter url in page
    await page.goto("https://www.coles.com.au/catalogues-and-specials");
    console.log("url entered");

    // choose catalogue page
    await page.waitForSelector(".sf-catalogues-tile-image");

    const example = await page.$$(".sf-catalogues-tile-image");
    await example[0].click();

    await page.waitForSelector(".sf-maparea");
    await page.click('[title="Half Price Specials"]');
    await page.waitForSelector(".sf-item-heading");

    let loads = await page.evaluate(() => {
      let number = document.querySelector('[title="Half Price Specials"] .rocket__navbar__pill').innerText;
      return parseInt(number);
    })

    loads = (loads / 28) - 1;
    
    // click load until all products are displayed
    while (loads > 0) {
      loads -= 1;
      await page.waitFor(1000);
      await page.click('#show-more');
      await page.waitFor(1000);
    }

    await page.screenshot({path: location, fullPage: true});
    console.log("screenshot taken");

    // get info on all products
    let products = await page.evaluate(() => {
      let prodName = document.querySelectorAll(".sf-item-heading");
      let prodPrice = document.querySelectorAll(".sf-pricedisplay");
      let prodUnit = document.querySelectorAll(".sf-nowprice .sf-optionsuffix");
      let prodImage = document.querySelectorAll(".sf-item-image img");

      let prodLen = prodName.length;
      let prodList = [];
      for (let i = 0; i < prodLen; i++) {
          let prodObject = {
              name: prodName[i].innerText,
              price: parseFloat((prodPrice[i].innerText).replace("$", "")),
              unit: prodUnit[i].innerText,
              image: prodImage[i].src,
              special: 1
          }            
      
          prodList.push(prodObject);
      }
      
      return prodList;

    });

    await browser.close();
    console.log(success("Browser Closed"));
    console.table(products);

    let con = db.createConnection(dbConfig);
      
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        
        let resetSql = "UPDATE products SET special=0";
        con.query(resetSql, (err, result) => {
          if (err) throw err;
          console.log("Number of records updated: " + result.affectedRows);
          console.log(result);
          console.log("reset");
        });

        let sql = "INSERT INTO products (name, price, unit, image, special) VALUES ? ON DUPLICATE KEY UPDATE price = VALUES(price), special = VALUES(special)";
        con.query(sql, [products.map(products => [products.name, products.price, products.unit, products.image, products.special])], (err, result) => {
          if (err) throw err;
          console.log("Number of records inserted or updated: " + result.affectedRows);
          console.log(result);
        });
      });

    return;

  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
}
