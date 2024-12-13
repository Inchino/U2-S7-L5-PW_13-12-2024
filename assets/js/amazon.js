const productsURL = 'https://striveschool-api.herokuapp.com/api/product/'


const getProducts = function () {
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
        /** Implementare la funzione per la renderizzazione delle cards */
        renderCards(data.products)
      })
      .catch((err) => {
        console.log(err)
    })
}

const renderCards = function (products) {
    let row = document.querySelector('.album .container .row')
    row.innerHTML = ''
    products.forEach((product) => {
      let colTemplate = `
      <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
          <a href="./pexels-details.html?productId=${product.id}">
              <img src=${product.src.small}} style="width: 100%" />
          </a>
              <div class="card-body">
              <a href="./pexels-details.html?productId=${product.id}">
                  <h5 class="card-title">Lorem Ipsum</h5>
              </a>
                  <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                  </p>
                  <div
                  class="d-flex justify-content-between align-items-center"
                  >
                  <div class="btn-group">
                      <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onclick="fillImageInModal(this)"
                      >
                          View
                      </button>
                      <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                      onclick="hideColumn(this)"
                      >
                      Hide
                      </button>
                  </div>
                  <small class="text-muted">${product.id}</small>
                  </div>
              </div>
          </div>
      </div>
      `
      row.innerHTML += colTemplate
    })
  }

