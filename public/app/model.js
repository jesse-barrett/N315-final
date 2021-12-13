// MODEL
var MODEL = (function () {
  //function that updates the page content
  function _navToPage(pageName, callback) {
    $.get(`pages/${pageName}/${pageName}.html`, function (data) {
      $("#app").html(data);
    });

    //run a callback function (if provided)
    if (callback) {
      callback(pageName);
    }
  }

  //function that adds a product card to the page
  function _addProduct(id, name, image, price) {
    let newCard = `
    <div class="card">
      <img src="${image}"/>
      <h1>${name}</h1>
      <p><span>$</span>${price}</p>
      <button class="site-btn" onClick="addItemToCart(event)" data-id="${id}">BUY NOW</button>
    </div>
    `;

    $(".products").append(newCard);
  }

  //function that adds a cart card to the page
  function _addCart(name, image, price) {
    let newCard = `
    <div class="cart-card">
        <div>
            <img src="${image}"></img>
            <div>${name}</div>
        </div>
        <div>
            <p id="individual-price">$${price}</p>
            <div>1 <span>
                    <ion-icon name="chevron-down-outline"></ion-icon>
                </span></div>
        </div>
        <p>$${price}</p>
        <span class="cancel">
            <ion-icon name="close-outline"></ion-icon>
        </span>
    </div>
    `;

    $(".cart-items").append(newCard);
    console.log(newCard);
  }

  //make functions accessible to the CONTROLLER
  return {
    navToPage: _navToPage,
    addProduct: _addProduct,
    addCart: _addCart,
  };
})();
