const myForm = document.getElementById("myForm");
const productName = document.getElementById("productName");
const brandName = document.getElementById("brandName");
const description = document.getElementById("description");
const urlImg = document.getElementById("urlImg");
const price = document.getElementById("price");

const btnSendForm = document.getElementById("sendForm");
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

document.addEventListener('load', init());

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
    manageProduct();
  } else if (checkValidity() && productMod) {
    formError.innerText = "";
    modifyProduct(productMod.id);
  } else {
    return;
  }
});


btnSendForm.addEventListener('click', function (e) {
  e.preventDefault();
  if (checkValidity() && !userMod) {
      formError.innerText = '';
      manageItem();
  } else if (checkValidity() && userMod) {
      formError.innerText = '';
      modifyItem(userMod.id);
  } else {
      return;
  }
});

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
};*/

const manageProduct = async id => {
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
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
          Authorization: apiKey,
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

const deleteItem = async id => {
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

const modifyProduct = async id => {
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