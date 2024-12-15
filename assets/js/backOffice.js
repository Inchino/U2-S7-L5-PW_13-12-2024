const myForm = document.getElementById("myForm");
const productName = document.getElementById("productName");
const brandName = document.getElementById("brandName");
const description = document.getElementById("description");
const urlImg = document.getElementById("urlImg");
const price = document.getElementById("price");

const btnSendForm = document.getElementById("sendForm")
const btnResetForm = document.getElementById("resetForm");
const formError = document.getElementById("formError");

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

document.addEventListener("load", init);

function init() {
  readList();
}

/*
function init() {
  btnSendForm.setAttribute("disabled", "true");
  readList();
}*/

btnSendForm.addEventListener("click", function (e) {
  e.preventDefault();
  if (check() && !productMod) {
    manageProduct();
  } else if (check() && productMod) {
    modifyProduct(productMod.id);
  } else {
    return;
  }
});

function check() {
  if (
    productName.value &&
    brandName.value &&
    description.value &&
    urlImg.value &&
    price.value
  ) {
    return true;
  } else {
    alert("Devi riempire tutti i campi!");
    return false;
  }
}

const manageProduct = async (id) => {
  if (!id) {
    let newProduct = new Product(
      productName.value,
      brandName.value,
      description.value,
      urlImg.value,
      price.value
    );
    try {
      let response = await fetch(productsURL, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      window.location.href = "index.html";
    } catch (error) {
      console.log(error);
    }
    readList();
    myForm.reset();
    /*btnSendForm.setAttribute("disabled", "true");*/
  } else {
    printForm(id);
  }
};

const deleteItem = async (id) => {
  try {
    await fetch(productsURL + id, {
      method: "DELETE",
    });
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
  readList();
  myForm.reset();
  /*btnSendForm.setAttribute('disabled', 'true');*/
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
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
    });
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
  productMod = {};
  readList();
  myForm.reset();
  /*btnSendForm.setAttribute('disabled', 'true');*/
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

  /*btnSendForm.removeAttribute("disabled");*/
}
