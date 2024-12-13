const myForm = document.getElementById("myForm");
const productName = document.getElementById("productName");
const brandName = document.getElementById("brandName");
const description = document.getElementById("description");
const urlImg = document.getElementById("urlImg");
const price = document.getElementById("price");
const btnSendForm = document.getElementById("sendForm");
const btnResetForm = document.getElementById("resetForm");
const formError = document.getElementById("formError");

let productList = [];
let productMod = {};

class Product {
  constructor(_productName, _brandName, _description, _urlImg, _price) {
    this.productName = _productName;
    this.brandName = _brandName;
    this.description = _description;
    this.urlImg = _urlImg;
    this.price = _price;
  }
}

document.addEventListener("DOMContentLoaded", init());

function init() {
    readList();
}
/*
function init() {
  btnSendForm.setAttribute("disabled", "true");
  readList();
}

btnSendForm.addEventListener("click", function (e) {
  e.preventDefault();
  if (checkValidity() && !productMod) {
    formError.innerText = "";
    manageProducts();
  } else if (checkValidity() && productMod) {
    formError.innerText = "";
    modifyProduct(productMod.id);
  } else {
    return;
  }
});
*/
const checkValidity = () => {
  let validity = true;
  if (productName.value === "") {
    formError.innerText = "Nome del prodotto obbligatorio";
    validity = false;
  } else if (brandName.value === "") {
    formError.innerText = "Nome del brand obbligatorio";
    validity = false;
  } else if (description.value === "") {
    formError.innerText = "Descrizione del prodotto obbligatoria";
    validity = false;
  } else if (urlImg.value === "") {
    formError.innerText = "Immagine del prodotto obbligatoria";
    validity = false;
  } else if (!price.value || isNaN(price.value) || Number(price.value) <= 0) {
    formError.innerText = "Prezzo del prodotto non valido";
    validity = false;
  }
  if (validity) {
    btnSendForm.removeAttribute("disabled");
  } else {
    btnSendForm.setAttribute("disabled", "true");
  }
  return validity;
};

const manageProducts = async (id) => {
  if (!id) {
    let newProduct = new Product(
      productName.value,
      brandName.value,
      description.value,
      urlImg.value,
      price.value
    );
    try {
      const response = await fetch(productsURL, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDFlZGQyMjA3MTAwMTVkZTJmNWQiLCJpYXQiOjE3MzQwODQzOTAsImV4cCI6MTczNTI5Mzk5MH0.BSUAJ-aIAB9ObUGC4pG3En0XA35-1CMdW7v4OZLwRhM",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
    readList();
    myForm.reset();
    btnSendForm.setAttribute("disabled", "true");
  } else {
    printForm(id);
  }
};

const deleteItem = async (id) => {
  try {
    await fetch(productsURL + id, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
    formError.innerText = "Errore durante l'eliminazione del prodotto.";
  }
  readList();
  myForm.reset();
  btnSendForm.setAttribute('disabled', 'true');
};

const modifyProduct = async (id) => {
  productMod.productName = productName.value;
  productMod.brandName = brandName.value;
  productMod.description = description.value;
  productMod.urlImg = urlImg.value;
  productMod.price = price.value;
  try {
    await fetch(productsURL + id, {
      method: "PUT",
      body: JSON.stringify(productMod),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDFlZGQyMjA3MTAwMTVkZTJmNWQiLCJpYXQiOjE3MzQwODQzOTAsImV4cCI6MTczNTI5Mzk5MH0.BSUAJ-aIAB9ObUGC4pG3En0XA35-1CMdW7v4OZLwRhM",
      },
    });
  } catch (error) {
    console.log(error);
  }
  productMod = {};
  readList();
  myForm.reset();
  btnSendForm.innerText = "AGGIUNGI";
};

function printForm(id) {
  for (let i = 0; i < productList.length; i++) {
    if (id == productList[i].id) {
        productMod = new Product(
            productList[i].productName,
            productList[i].brandName,
            productList[i].description,
            productList[i].urlImg,
            productList[i].price
          );
          productMod.id = productList[i].id;
    }
  }
  productName.value = productMod.productName;
  brandName.value = productMod.brandName;
  description.value = productMod.description;
  urlImg.value = productMod.urlImg;
  price.value = productMod.price;

  btnSendForm.innerText = "MODIFICA";
  btnSendForm.removeAttribute("disabled");
}