const productsURL = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDFlZGQyMjA3MTAwMTVkZTJmNWQiLCJpYXQiOjE3MzQwODQzOTAsImV4cCI6MTczNTI5Mzk5MH0.BSUAJ-aIAB9ObUGC4pG3En0XA35-1CMdW7v4OZLwRhM";

const url = new URLSearchParams(window.location.search);
const productModifyId = url.get("_id");

const myForm = document.getElementById("myForm");
const productName = document.getElementById("productName");
const brandName = document.getElementById("brandName");
const description = document.getElementById("description");
const urlImg = document.getElementById("urlImg");
const price = document.getElementById("price");

const btnSendForm = document.getElementById("sendForm")
const btnResetForm = document.getElementById("resetForm");
const btnDelete = document.getElementById("btnDelete");
const formError = document.getElementById("formError");

//let product;
//let newProduct;
let productId = null || productModifyId;

class Product {
  constructor(_productName, _brandName, _description, _urlImg, _price) {
    this.productName = _productName;
    this.brandName = _brandName;
    this.description = _description;
    this.urlImg = _urlImg;
    this.price = _price;
  }
}

window.addEventListener("load", init());

function init() {
  if (productId) {
    btnSendForm.innerText = "Modifica";
    btnDelete.style.display = "inline-block";
    readList();
  }
}

/*
function init() {
  //btnSendForm.setAttribute("disabled", "true");
  readList();
}*/

async function readList() {
  try {
    let response = await fetch(productsURL + productId, {
      headers: {
        Authorization: apiKey,
      },
    });
    const product = await response.json();
    printForm(product);
    console.log(product);
  } catch (error) {
    console.log(error);
  }
}

function printForm(product) {
  productName.value = product.name;
  brandName.value = product.brand;
  description.value = product.description;
  urlImg.value = product.imageUrl;
  price.value = product.price;
}

function check() {
  if (
    !productName.value ||
    !brandName.value ||
    !description.value ||
    !urlImg.value ||
    isNaN(price.value) ||
    price.value <= 0
  ) {
    alert("Tutti i campi sono obbligatori e il prezzo deve essere valido!");
    return null;
  }
  return new Product(
    productName.value,
    brandName.value,
    description.value,
    urlImg.value,
    parseFloat(price.value)
  );
}
/*
btnSendForm.addEventListener("click", function (e) {
  e.preventDefault();
  check();
  //console.log(newProduct);
  if (!productId) {
    manageProduct();
  } else {
    modifyProduct();
  }
});*/

btnSendForm.addEventListener("click", (e) => {
  e.preventDefault();
  const newProduct = check();
  if (newProduct) {
    if (productId) {
      modifyData(newProduct);
    } else {
      manageProduct(newProduct);
    }
  }
});
/*
async function manageProduct(newProduct) {
  try {
    let response = await fetch(productsURL, {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
    });
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
}*/

async function manageProduct(newProduct) {
  try {
    if (!newProduct || typeof newProduct !== "object") {
      throw new Error("newProduct non è valido. Assicurati di passare un oggetto con i campi corretti.");
    }

    console.log("newProduct inviato:", newProduct);

    let response = await fetch(productsURL, {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Errore nella risposta del server: ${response.status} ${response.statusText}`);
    }

    console.log("Prodotto creato con successo!");
    window.location.href = "index.html"; // Reindirizzamento dopo il successo
  } catch (error) {
    console.error("Errore durante la creazione del prodotto:", error);
  }
}


async function modifyData(newProduct) {
  try {
    let response = await fetch(productsURL + productId, {
      method: "PUT",
      body: JSON.stringify(newProduct),
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
    });
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
}
/*
btnConfirmDelete.addEventListener("click", (e) => {
  e.preventDefault();
  if (productId) {
    deleteProduct();
    console.log("Prodotto eliminato!");
  }
});*/
/*
btnDelete.addEventListener("click", async (e) => {
  e.preventDefault();
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    await deleteData();
  }
});

async function deleteData() {
  try {
    let response = await fetch(productsURL + productId, {
      method: "DELETE",
      headers: {
        Authorization: apiKey,
      },
    });
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
}*/
