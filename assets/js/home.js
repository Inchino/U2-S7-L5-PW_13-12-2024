const productsURL = "https://striveschool-api.herokuapp.com/api/product/";
const productsWrappers = document.querySelector("#products-wrapper");
const shoppingCart = document.querySelector("#shopping-cart");

let shoppingCartList = [];
/*
async function readList() {
  try {
    let read = await fetch(productsURL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDFlZGQyMjA3MTAwMTVkZTJmNWQiLCJpYXQiOjE3MzQwODQzOTAsImV4cCI6MTczNTI5Mzk5MH0.BSUAJ-aIAB9ObUGC4pG3En0XA35-1CMdW7v4OZLwRhM",
      },
    });
    if (!read.ok) {
      throw new Error(`Errore HTTP: ${read.status}`);
    }
    productList = await read.json();
    if (productList.length > 0) {
      renderCards(productList);
    } else {
      productsWrappers.innerHTML = "";
      return;
    }
  } catch (error) {
    console.log("Errore nel recupero dei dati: ", error);
  }
}*/

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
        throw new Error('Error getting the products')
      }
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
  })
}

function renderCards(products) {
  productsWrappers.innerHTML = "";

  products.forEach((product) => {
    const productSelected =
      shoppingCartList.findIndex(
        (cardProduct) => cardProduct.title === product.title
      ) !== -1;

    productsWrappers.innerHTML += `
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
                    <a href="/backOffice.html"><button class="btn btn-warning" >Modifica</button></a>
                    <a href="/details.html"><button class="btn btn-primary">Scopri di più</button></a>
                </div>
              </div>
            </div>
          </div>
      `;
  });
}
