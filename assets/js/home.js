const productsURL = 'https://striveschool-api.herokuapp.com/api/product/'
const productsWrappers = document.querySelector("#products-wrapper");
const shoppingCart = document.querySelector("#shopping-cart");

async function readList() {
  try {
      let read = await fetch(productsURL);
      let response = await read.json();
      productList = response;
      if (productList.length > 0) {
          renderCards();
      } else {
          empty.innerText = 'Nessun prodotto presente';
          return;
      }
  } catch (error) {
      console.log('Errore nel recupero dei dati: ', error);
      empty.innerText = `Errore nel recupero dei dati: ${error}`;
  }
}

function renderCards(products) {
  productsWrappers.innerHTML = "";
 
  products.forEach((product) => {
    const productSelected =
      shoppingCartList.findIndex(
        (cardProduct) => cardProduct.title === product.title
      ) !== -1;  /* Creazione della lista del Carrello tramite il titolo del film */

      /* Creazione Bootstrap della Card che si differenziano tramite gli attributi dell'oggetto in json */
    productsWrappers.innerHTML += `
            <div class="col">
              <div class="card shadow-sm h-100 ${
                productSelected ? "selected" : ""
              }">
                <img src="${product.urlImg}" class="img-fluid card-img-top" alt="${
      product.productName
    }">
                <div class="card-body">
                  <h5 class="card-title">${product.productName}</h5>
                  <p class="card-text badge rounded-pill bg-dark mb-2">${
                    product.brandName
                  }</p>
                  <p class="card-text bg-dark mb-2">${
                    product.description
                  }</p>
                  <p class="fs-4">${product.price}€</p>
                  <div>
                      <button class="btn btn-danger" onclick="addToCart(event, '${
                        product.asin
                      }')">Compra ora</button>
                      <button class="btn btn-outline-danger" onclick="skipMe(event)">
                        Scarta
                      </button>
                  </div>
                </div>
              </div>
            </div>
          `;
  });
}

