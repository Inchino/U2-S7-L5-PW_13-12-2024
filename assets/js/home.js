const productsURL = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDFlZGQyMjA3MTAwMTVkZTJmNWQiLCJpYXQiOjE3MzQwODQzOTAsImV4cCI6MTczNTI5Mzk5MH0.BSUAJ-aIAB9ObUGC4pG3En0XA35-1CMdW7v4OZLwRhM";
const productsWrapper = document.querySelector("#products-wrapper");
const shoppingCart = document.querySelector("#shopping-cart");

let productList = [];
let shoppingCartList = [];
let nextPage;
let newUrl;

async function readList() {
  try {
    let read = await fetch(productsURL, {
      headers: {
        Authorization: apiKey,
      },
    });
    productList = await read.json();
    if (productList.length > 0) {
      //printForm(id);
      renderCards(productList);
    } else {
      console.log(productList);
    }
  } catch (error) {
    console.log("Errore nel recupero dei dati: ", error);
  }
}

/*
const readList = function () {
  fetch( productsURL, {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDFlZGQyMjA3MTAwMTVkZTJmNWQiLCJpYXQiOjE3MzQwODQzOTAsImV4cCI6MTczNTI5Mzk5MH0.BSUAJ-aIAB9ObUGC4pG3En0XA35-1CMdW7v4OZLwRhM'
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Errore nella ricezione dei prodotti')
      }
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
  })
}*/

window.addEventListener("load", init());

function init() {
  readList();
}

function renderCards(productList) {
  productsWrapper.innerHTML = "";

  productList.forEach((product) => {
    const productSelected =
      shoppingCartList.findIndex(
        (cardProduct) => cardProduct.title === product.title
      ) !== -1;

    productsWrapper.innerHTML += `
          <div class="col">
            <div class="card shadow-sm h-100 ${
              productSelected ? "selected" : ""
            }">
              <img src="${
                product.urlImg || "default-image.jpg"
              }" class="img-fluid card-img-top" alt="${product.productName}">
              <div class="card-body">
                <h5 class="card-title">${product.productName}</h5>
                <p class="card-text badge rounded-pill bg-dark mb-2">${
                  product.brandName
                }</p>
                <p class="card-text bg-dark mb-2">${product.description}</p>
                <p class="fs-4">${product.price}€</p>
                <div>
                    <button class="btn btn-danger" onclick="modify(e)">Modifica</button>
                      <button class="btn btn-outline-danger" onclick="details(e)">Dettagli</button>
                </div>
              </div>
            </div>
          </div>
      `;
    const modify = (e) => {
      e.preventDefault();
      nextPage = "backOffice.html";
      newUrl = `${nextPage}?_id=${productList[i]._id}`;
      window.location.href = newUrl;
    };

    const details = (e) => {
      e.preventDefault();
      nextPage = "details.html";
      newUrl = `${nextPage}?_id=${productList[i]._id}`;
      window.location.href = newUrl;
    };
  });
}
