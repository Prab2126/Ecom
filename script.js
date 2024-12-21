import data from "./data.js";
let firstEl = document.querySelectorAll(".first");
let secondEl = document.querySelectorAll(".second");
let logo = document.querySelector(".logo");
let thirdEl = document.querySelectorAll(".third");
let nav = document.querySelector("nav").children;
let aboutName = document.querySelectorAll(".aboutNone");
let productName = document.querySelectorAll(".productName");
let contactName = document.querySelectorAll(".contactName");
let cart = document.querySelector("#cart");
let tost = document.querySelector("#tost");
let tax = document.querySelector("#tax");
let currentPrice = document.querySelector("#currentPrice");
let finalPrice = document.querySelector("#finalPrice");
let animDiv = document.querySelector("#serviceValue");
let productItemsPar = document.querySelector("#all-items");
let about = "block";
nav[0].classList.add("changePy");
let addItmes = document.querySelector("#addItmes");
let priceArea = document.querySelector("#priceArea ");
let allmostAllElement = document.querySelectorAll(".cartRemove");
let listID = 0;
priceArea.style.display = "none";

const renderItems = (data) => {
  data.forEach((el) => {
    productItemsPar.insertAdjacentHTML(
      "beforeend",
      ` <div class="category">
      <span class="tag">${el?.category}</span>
      <img
        src=${el?.image}
        alt="product img"
      />
      <h1>${el?.name}</h1>
      <span class="star">${el?.star}</span>
      <p>
       ${el?.description}
      </p>
      <div class="price">
        <span>₹${el?.price}</span>
        <s> ₹${el?.price * 2}</s>
      </div>
      <p class="stock quality">
        Total Stocks Available:

        <span>${el?.stock}</span>
      </p>
      <div class="quality">
        Quantity(Pieces)
        <div class="incDecBtn">
          <button data-id=${el?.id} id="inc">+</button>
          <input data-id=${el?.id} type="text" readonly value=${el.value} />
          <button data-id=${el?.id} id="dec">-</button>
        </div>
      </div>
      <button data-id=${el?.id} class="Addcarts">
        <i class="fas fa-cart-shopping"></i> Add To Cart
      </button>
    </div>`
    );
  });
};
renderItems(data);

const array = data.map((e) => e.value);
const addToCart = [];
const DOM = (Cartindex) => `
  <div class="cartItems">
  <div class="info">
        <span class="tag">${Cartindex?.category}</span>
        <img
          src=${Cartindex?.img}
          alt="not found"
        />
        <h3>${Cartindex.name}</h3>
      </div>
      <div class="Cartprize quality">
        <span class="samePrice"> ${Cartindex?.orginalPrice}</span>
        <div class="incDecBtn">
          <button data-id="${Cartindex?.id}" id="inc">+</button>
          <input data-id="${Cartindex?.id}" type="text" readonly value=${Cartindex.Itemsno} />
          <button data-id="${Cartindex?.id}" id="dec">-</button>
        </div>
        <button class="Addcarts">Remove</button>
      </div></div>`;
const cartAddView = (check, DOMelement, Cartindex) => {
  if (check) {
    addItmes.innerHTML = "";
    addToCart.forEach((e) => (addItmes.innerHTML += DOMelement(e)));
  } else addItmes.innerHTML += DOMelement(Cartindex);
};

let calculateArr = [0, 50];

function finalPriceDom() {
  let calculateArrValue = addToCart.reduce((a, n) => a + n.price, 0);
  calculateArr[0] = calculateArrValue;
  currentPrice.innerHTML = calculateArrValue;
  tax.innerHTML = calculateArr[0] == 0 ? 0 : calculateArr[1];
  finalPrice.innerHTML =
    calculateArr[0] == 0 ? 0 : calculateArr.reduce((a, n) => a + n);
}

const numUpdate = (e, id, index, indexofCart, bool, orginalPrice) => {
  if (id == "inc") {
    let dataValue =
      data[index].stock <= array[index]
        ? data[index].stock
        : (array[index] += 1);
    e.target.nextElementSibling.value = dataValue;

    if (bool) {
      addToCart[indexofCart].price = orginalPrice * dataValue;
      finalPriceDom();
    }
  }
  if (id == "dec") {
    let dataValue = 1 >= array[index] ? 1 : (array[index] -= 1);
    e.target.previousElementSibling.value = dataValue;
    if (bool) {
      addToCart[indexofCart].price <= orginalPrice
        ? orginalPrice
        : (addToCart[indexofCart].price -= orginalPrice);
      finalPriceDom();
    }
  }
};

const cartItemsRender = (check) => {
  finalPriceDom();

  if (addToCart.length == 0) {
    addItmes.innerHTML = "";
    addItmes.previousElementSibling.innerHTML = "No item found";
  } else {
    let Cartindex = addToCart[addToCart.length - 1];
    addItmes.previousElementSibling.innerHTML = "";
    check ? cartAddView(true, DOM) : cartAddView(false, DOM, Cartindex);
  }
};
cartItemsRender();
productItemsPar.addEventListener("click", (e) => {
  let id = e.target.id;
  let Dataid = e.target.dataset.id;
  let index = Dataid - 1;
  numUpdate(e, id, index);
  if (e.target.classList == "Addcarts") {
    tost.children[0].innerHTML = Dataid;
    let objectValue = data[index];
    const obj = {
      id: objectValue.id,
      index: listID++,
      price: objectValue.price * array[index],
      orginalPrice: objectValue.price,
      img: objectValue.image,
      category: objectValue.category,
      name: objectValue.name,
      Itemsno: array[index],
    };
    if (addToCart.some((e) => e.id == obj.id)) alert("The item is in cart");
    else {
      addToCart.push(obj);
      cart.children[1].innerHTML = addToCart.length;
      cartItemsRender();
      finalPriceDom();

      setTimeout(() => {
        tost.style.right = "23px";
      }, 0);
      setTimeout(() => {
        tost.style.right = "-307px";
      }, 2000);
    }
  }
});

[...nav].forEach((e) => {
  e.addEventListener("click", (element) => {
    let target = element.target;
    priceArea.style.display = "none";

    target.innerText == "ABOUT" ? (about = "none") : (about = "block");

    if (target.innerText == "PRODUCTS")
      productName.forEach((e) => (e.style.display = "none"));
    else {
      productName[0].style.display = "grid";
      productName[2].style.display = "flex";
      productName[1].style.display = "block";
    }
    contactName.forEach((e) => (e.style.display = "flex"));

    aboutName.forEach((e) => (e.style.display = about));
    aboutName[1].style.display = about == "none" ? "none" : "grid";

    [...nav].forEach((e) => e.classList.remove("changePy"));
    target.classList.add("changePy");
  });
});

cart.addEventListener("click", () => {
  priceArea.style.display = "flex";

  allmostAllElement.forEach((e) => (e.style.display = "none"));
});

priceArea.addEventListener("click", (e) => {
  let id = e.target.id;
  let index = e.target.dataset.id;
  let indexofCart = addToCart.findIndex((e) => e.id == index);
  let orginalPrice = addToCart[indexofCart]?.orginalPrice;
  numUpdate(e, id, index - 1, indexofCart, true, orginalPrice);
  if (e.target.classList == "Addcarts") {
    addToCart.splice(indexofCart - 1, 1);
    cartItemsRender(true);
  }
});

const addRemove = (value, element) => {
  value <= ((scrollY + innerHeight) / animDiv.offsetTop) * 100
    ? element.classList.add("visible-js")
    : element.classList.remove("visible-js");
};

window.addEventListener("scroll", () => {
  firstEl.forEach((e) => addRemove(103, e));
  secondEl.forEach((e) => addRemove(111, e));
  thirdEl.forEach((e) => addRemove(119, e));
  addRemove(111, logo);
});
