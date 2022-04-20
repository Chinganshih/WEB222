/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Ching-An, Shih
 *      Student ID: 148221195
 *      Date:       2022-04-01
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { products, categories } = window;

// For debugging, display all of our data in the console
console.log({ products, categories }, "Store Data");

function createNode(source, tag, id) {
  var s = document.querySelector(source);
  var d = document.createElement(tag);
  s.appendChild(d);
  d.id = id;
  d.className = id;
}

//Convert the price in cents to dollars and cents
function dollarCent(price) {
  price = price / 100;
  const dollarcent = { style: "currency", currency: "CAD" };
  const numberFormat = new Intl.NumberFormat("en-CA", dollarcent);

  return numberFormat.format(price);
}

function isDiscontinued(discontinued) {
  var ishidded = false;
  if (discontinued) ishidded = true;
  return ishidded;
}

// Create all of the buttons for your store’s Categories
function createCatBtn() {
  createNode("#menu", "div", "topnav");

  // Use each Category’s name for the button’s text
  categories.forEach((element) => {
    var catName = element.name;
    var topnavOpt = document.createElement("a");
    var topnav = document.querySelector("#topnav");
    topnav.appendChild(topnavOpt);
    topnavOpt.id = "topbtn";
    topnavOpt.href = "#" + catName;
    topnavOpt.innerText = catName;
  });
}

//display default category and product
function defaultCategory() {
  //default first category
  var topbtn = document.querySelectorAll("#topbtn");
  document.querySelector("#selected-category").innerText = topbtn[0].innerText;

  //default first Product
  let index = 1;
  let card_index = 1;
  let numberOfprod = 0;
  var selectCat = categories.filter((element) => element.name === topbtn[0].innerText);
  products.forEach((e) => {
    if (e.categories[0] === selectCat[0].id && !isDiscontinued(e.discontinued)) {
      numberOfprod++;
    }
  });
  //3.5 create tr for card table
  for (let i = 0; i < Math.ceil(numberOfprod / 3); i++) {
    createNode("#card-table", "tr", "card_tr" + (i + 1));
  }
  products.forEach((e) => {
    if (e.categories[0] === selectCat[0].id && !isDiscontinued(e.discontinued)) {
      createtableIndex(e, index);
      createProductCard(e, Math.ceil(card_index / 3), card_index);

      index++;
      card_index++;
    }
  });
}

//create table index
function createtableIndex(e, index) {
  createNode("#category-products", "tr", "tbody_tr" + index);
  for (var i = 0; i < 3; i++) {
    //Create a <tr> element
    createNode("#tbody_tr" + index, "th", "tbody_th" + index + (i + 1));
    //Add a click handler to your <tr> that will console.log() the product whenever the user clicks it
    var trN = document.querySelector("#tbody_tr" + +index);
    trN.addEventListener("click", function () {
      console.log(trN.innerText);
    });
    //Create <td> elements for the product’s title, description, and price
    switch (i + 1) {
      case 1:
        document.querySelector("#tbody_th" + index + 1).innerText = e.title;
        break;
      case 2:
        document.querySelector("#tbody_th" + index + 2).innerText = e.description;
        break;
      case 3:
        document.querySelector("#tbody_th" + index + 3).innerText = dollarCent(e.price);
        break;
    }
  }
}

function createProductCard(e, index, card_index) {
  createNode("#card_tr" + index, "th", "card_th" + index + card_index);
  createNode("#card_th" + index + card_index, "div", "card_div" + index + card_index);
  createNode("#card_div" + index + card_index, "img", "img" + index + card_index);
  createNode("#card_div" + index + card_index, "div", "container" + index + card_index);
  createNode("#container" + index + card_index, "h3", "title" + index + card_index);
  createNode("#container" + index + card_index, "p", "desc" + index + card_index);
  createNode("#container" + index + card_index, "span", "price" + index + card_index);
  // find out image and add scr
  var cardimg = document.querySelector("#img" + index + card_index);
  cardimg.src =
    "/assignment-4/src/image/" +
    e.categories[0] +
    card_index +
    ".jpg?auto=format&fit=crop&w=750&q=80";
  cardimg.title = e.description;

  //add style for div
  var div = document.querySelector("#card_div" + index + card_index);
  div.setAttribute("style", "box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)");
  div.style.transition = 0.3;
  div.style.width = "100%";
  div.style.background = "lightgrey";
  div.style.borderRadius = "5px";
  div.style.boxShadow = "0 8px 16px 0 rgba(0, 0, 0, 0.2)";
  div.onmouseover = function () {
    this.style.boxShadow = "0 8px 16px 0 rgba(0, 0, 0, 0.2)";
  };

  //add style for container
  var container = document.querySelector("#container" + index + card_index);
  container.style.padding = "5px";

  //add style for desc
  var desc = document.querySelector("#desc" + index + card_index);
  desc.innerText = e.description;
  desc.setAttribute("style", "color: rgb(97, 33, 33)");

  // add title and price for each card
  var title = document.querySelector("#title" + index + card_index);
  title.innerText = e.title;
  title.setAttribute("style", "color: rgb(97, 33, 33)");

  var price = document.querySelector("#price" + index + card_index);
  price.innerHTML = dollarCent(e.price);
  price.setAttribute("style", "color : grey");
  price.style.fontWeight = "bold";

  //modify img
  var img = document.querySelector("#img" + index + card_index);
  img.style.width = "400px";
  img.style.height = "400px";
}

// 1.	Create an event handler to run when the page is loaded.
window.onload = function () {
  //1. Create all of the buttons for your store’s Categories
  createCatBtn();
  //2. display default Category and Product
  defaultCategory();

  //3. addEventListener for all buttons
  var topbtn = document.querySelectorAll("#topbtn");
  topbtn.forEach(function (e) {
    e.addEventListener("click", function () {
      let index = 1;
      let card_index = 1;
      let numberOfprod = 0;

      //3.1 Update the text of the Selected Category Title above your table with the category’s name
      document.querySelector("#selected-category").innerText = e.innerText;
      //3.2 Clear the current <tr>…</tr> rows from the <tbody>…</tbody>. HINT: innerHTML = “”
      document.querySelector("#category-products").innerHTML = "";
      document.querySelector("#card-table").innerHTML = "";
      //3.3 Filter your products Array (i.e., use Array.prototype.filter()) to get:
      var selectCat = categories.filter((element) => element.name === e.innerText);
      //3.4 count how many product in same category
      products.forEach((e) => {
        if (e.categories[0] === selectCat[0].id && !isDiscontinued(e.discontinued)) {
          numberOfprod++;
        }
      });
      //3.5 create tr for card table
      for (let i = 0; i < Math.ceil(numberOfprod / 3); i++) {
        createNode("#card-table", "tr", "card_tr" + (i + 1));
      }
      //3.4 Loop (use Array.prototype.forEach()) over your filtered product list and add them to the table’s body:
      products.forEach((e) => {
        if (e.categories[0] === selectCat[0].id && !isDiscontinued(e.discontinued)) {
          createtableIndex(e, index);
          createProductCard(e, Math.ceil(card_index / 3), card_index);

          index++;
          card_index++;
        }
      });
    });
  });
};
