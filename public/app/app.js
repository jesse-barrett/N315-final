// CONTROLLER
var cart = [];

//function that listens for the user to be logged in or out
function initFirebase() {
  console.log("initFirebase");
  //check to see if the user is logged in
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Logged in");
    } else {
      console.log("Logged Out");
    }
  });
}

//retrieve all items from the cart
function getCart() {
  //empty the cart display
  $(".cart-items").empty();

  console.log(cart);

  if (cart.length === 0) {
    //if the cart is empty, display the cart-header and hide the cart body
    $(".cart-header").css("display", "block");
    $(".cart-body").css("display", "none");
  } else {
    //if the cart has at least one item in it, show the cart body and hide the header
    $(".cart-header").css("display", "none");
    $(".cart-body").css("display", "flex");
    $.each(cart, (index, item) => {
      //display the cart item
      MODEL.addCart(item.name, item.image, item.price);
    });
  }
}

//add an item to the cart
function addItemToCart(event) {
  let itemId = event.target.dataset.id;

  //get the data from the data.json
  $.getJSON("data/data.json", function (data) {
    //create a new cart object to add to the cart
    let obj = {
      id: data.CoffeeMakers[itemId].id,
      name: data.CoffeeMakers[itemId].name,
      image: data.CoffeeMakers[itemId].image,
      price: data.CoffeeMakers[itemId].price,
      count: 1,
    };

    //add the item to the cart
    cart.push(obj);
    console.log(cart);
  });
}

//retrieve all coffee makers from the data.json
function getProducts() {
  //empty the container
  $(".products").empty();

  //load the JSON data
  $.getJSON("data/data.json", function (data) {
    //for each object in the array
    $.each(data.CoffeeMakers, (index, product) => {
      //display a card with a product listed on it
      MODEL.addProduct(product.id, product.name, product.image, product.price);
    });
  });
}

//function that listens for clicks and other events
function initListeners() {
  //run the route function once on load
  route();

  //run the route function again whenever the URL hash changes
  $(window).on("hashchange", route);
}

function loadPage(pageId) {
  if (pageId === "coffee-makers") {
    getProducts();
  } else if (pageId === "cart") {
    getCart();
  }
}

//function that routes the user between pages
function route() {
  //retrieve the page destiation from the URL
  let hashTag = window.location.hash;
  let pageId = hashTag.replace("#/", "");

  if (!pageId) {
    MODEL.navToPage("coffee-makers", loadPage);
  } else {
    MODEL.navToPage(pageId, loadPage);
  }
}

//run this function when the page initially loads
$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
  } catch {
    //display an error if the document.ready failed
    console.error("error");
  }
});
