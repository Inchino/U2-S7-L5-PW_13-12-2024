const url = new URLSearchParams(window.location.search);
const detailProductId = url.get("_id");

const dName = document.getElementById("dName");
const dDesc = document.getElementById("dDesc");
const dBrand = document.getElementById("dBrand");
const dImage = document.getElementById("dImage");
const dPrice = document.getElementById("dPrice");

document.addEventListener("load", init());

function init() {
  readList();
}

function drintDetail() {
  dName.innerText = productList.name;
  dDesc.innerText = productList.description;
  dBrand.innerText = productList.brand;
  dImage.setAttribute("src", productList.imageUrl);
  dPrice.innerText = productList.dPrice + "€";
}