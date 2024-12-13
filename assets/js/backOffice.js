const myForm = document.getElementById('myForm');
const productName = document.getElementById('productName');
const brandName = document.getElementById('brandName');
const description = document.getElementById('description');
const urlImg = document.getElementById('urlImg');
const price = document.getElementById('price');
const btnSendForm = document.getElementById('sendForm');
const btnResetForm = document.getElementById('resetForm');
const formError = document.getElementById('formError');
const empty = document.getElementById('empty');

let productList = [];
let productMod;

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

function init(){
    btnSendForm.setAttribute('disabled', 'true');
    readList();
}

btnSendForm.addEventListener('click', function (e) {
    e.preventDefault();
    if (checkValidity() && !userMod) {
        formError.innerText = '';
        manageProducts();
    } else if (checkValidity() && userMod) {
        formError.innerText = '';
        modifyProduct(userMod.id);
    } else {
        return;
    }
});

const checkValidity = () => {
    let validity = true;
    if (productName.value == '') {
        formError.innerText = 'Nome del prodotto obbligatorio';
        validity = false;
        btnSendForm.setAttribute('disabled', 'true');
        return validity;
    }
    if (brandName.value == '') {
        formError.innerText = 'Nome del brand obbligatorio';
        validity = false;
        btnSendForm.setAttribute('disabled', 'true');
        return validity;
    }
    if (description.value == '') {
        formError.innerText = 'Descrizione del prodotto obbligatoria';
        validity = false;
        btnSendForm.setAttribute('disabled', 'true');
        return validity;
    }
    if (urlImg.value == '') {
        formError.innerText = 'Immagine del prodotto obbligatoria';
        validity = false;
        btnSendForm.setAttribute('disabled', 'true');
        return validity;
    }
    if (price.value == '') {
        formError.innerText = 'Prezzo del prodotto obbligatorio';
        validity = false;
        btnSendForm.setAttribute('disabled', 'true');
        return validity;
    }
    return validity;
}

const manageProducts = async id => {
    if (!id) {
        let newProduct = new Product(productName.value, brandName.value, description.value, urlImg.value, price.value);
        try {
            await fetch(productsURL, {
                method: 'POST',
                body: JSON.stringify(newProduct),
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDFlZGQyMjA3MTAwMTVkZTJmNWQiLCJpYXQiOjE3MzQwODQzOTAsImV4cCI6MTczNTI5Mzk5MH0.BSUAJ-aIAB9ObUGC4pG3En0XA35-1CMdW7v4OZLwRhM'
                }
            });
        } catch (error) {
            console.log(error);
        }
        readList();
        myForm.reset();
        btnSendForm.setAttribute('disabled', 'true');
    } else {
        printForm(id);
    }
}

const deleteItem = async id => {
    try {
        await fetch(productsURL + id, {
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
    readList();
    myForm.reset();
    btnSendForm.setAttribute('disabled', 'true');
}

const modifyProduct = async id => {
    productMod.productName = productName.value;
    productMod.brandName = brandName.value;
    productMod.description = description.value;
    productMod.urlImg = urlImg.value;
    productMod.price = price.value;
    try {
        await fetch(productsURL + id, {
            method: 'PUT',
            body: JSON.stringify(productMod),
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDFlZGQyMjA3MTAwMTVkZTJmNWQiLCJpYXQiOjE3MzQwODQzOTAsImV4cCI6MTczNTI5Mzk5MH0.BSUAJ-aIAB9ObUGC4pG3En0XA35-1CMdW7v4OZLwRhM'
            }
        })
    } catch (error) {
        console.log(error);
    }
    productMod = '';
    readList();
    myForm.reset();
    btnSendForm.innerText = 'AGGIUNGI';
    btnSendForm.setAttribute('disabled', 'true');
}

function printForm(id) {
    for (let i = 0; i < productList.length; i++) {
        if (id == productList[i].id) {
            userMod = new User(productList[i].productName, productList[i].brandName, productList[i].description, productList[i].urlImg, productList[i].price);
            userMod.id = productList[i].id;
        }
    }
    productName.value = productName.value;
    brandName.value = brandName.value;
    description.value = description.value;
    urlImg.value = urlImg.value;
    price.value = price.value;
    btnSendForm.innerText = 'MODIFICA';
    btnSendForm.removeAttribute('disabled');
}

