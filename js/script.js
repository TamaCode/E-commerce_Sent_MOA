class Product {
  constructor(code, description, price) {
    this.code = code;
    this.description = description;
    this.price = price;
  }

  getIvaAmount(grossPrice) {
    this.ivaAmount = grossPrice * 0.21;
  }
}

// CALCULO LOS MONTOS DE IVA CORRESPONDIENTES A CADA PRODUCTO
const calculateProductIvaAmounts = (products) => {
  for(const product of products) {
    product.getIvaAmount(product.price);
  }
};

// CREO LOS OBJETOS PRODUCTOS DISPONIBLES PARA LA VENTA
const getProducts = () => {
  const products = new Array();

  products.push(new Product('1', 'Shampoo Sólido', 750));
  products.push(new Product('2', 'Desodorante Natural', 500));
  products.push(new Product('3', 'Bálsamo Labial', 330));
  products.push(new Product('4', 'Jabón Corporal', 350));
  products.push(new Product('5', 'Pasta Dental', 700));
  products.push(new Product('6', 'Acondicionador Sólido', 850));
  products.push(new Product('7', 'Jabonera de Madera', 400));
  products.push(new Product('8', 'Bálsamo Mentolado', 300));
  
  products.sort((productA, productB) => productA.code - productB.code); // ORDENO ARRAY DE PRODUCTOS SEGÚN EL CÓDIGO DE LOS MISMOS
  calculateProductIvaAmounts(products);

  return products;
};

// VALIDO EL CODIGO DE PRODUCTO INGRESADO POR EL USUARIO
const isCodeValid = (userInput, products) => {
  let isCodeValid = false;

  while (!isCodeValid) {
    for (const product of products) {
      if (product.code == userInput.code) {
        isCodeValid = true;
        break;
      }
    }

    if (!isCodeValid) {
      const productList = getProductList(products);
      userInput.code = prompt(`El código de producto ingresado no es válido, por favor intente nuevamente.\n\n${productList}`);
    }
  }
};


// VALIDO LA CANTIDAD DE PRODUCTO INGRESADO POR EL USUARIO
const isQuantityValueValid = (userInput) => {
  while (isNaN(userInput.quantity) || userInput.quantity <= 0) {
    userInput.quantity = parseInt(prompt('La cantidad ingresada debe ser un número positivo mayor a cero')) 
  }
};


// OBTENGO COMO STRING EL LISTADO DE TODOS LOS PRODUCTOS CON SU CODIGO, DESCRIPCION Y PRECIO
const getProductList = (products) => {
  let productList = '';

  for (const product of products) {
    productList += `${product.code} - ${product.description} - $${product.price}\n`;
  }
  
  return productList;
};


// MUESTRO EL LISTADO DE PRODUCTOS PARA QUE EL USUARIO SELECCIONE CUAL COMPRAR
const showProductList = (products) => {
  const userInput = {};
  const productList = getProductList(products);

  userInput.code = prompt(`Ingrese el código del producto que desea agregar a su Carrito de Compras. Al finalizar presione la tecla ESC para calcular el importe total de su Compra y que la misma se refleje en la Página.\n\n${productList}`);

  if (userInput.code != null) {
    isCodeValid(userInput, products);
    userInput.quantity = parseInt(prompt('Ingrese la cantidad a comprar del producto seleccionado.'));
    isQuantityValueValid(userInput);
  }

  return userInput;
};


// OBTENGO LAS ENTRADAS DEL USUARIO
const getUserInputs = (products) => {
  const userInputs = [];
  let userInput = showProductList(products);

  while (userInput.code != null) {
    userInputs.push(userInput);
    userInput = showProductList(products);
  }

  return userInputs;
};

// CALCULO EL MONTO BRUTO A PAGAR
const calculateTotalGrossAmount = (userInputs, products) => {
  let totalGrossAmount = 0;

  for (const userInput of userInputs) {
    const productPrice = products.find(product => product.code === userInput.code).price;
    totalGrossAmount += (productPrice * userInput.quantity);
  }

  return totalGrossAmount;
};

// CALCULO EL MONTO DE IVA A PAGAR
const calculateTotalIvaAmount = (userInputs, products) => {
  let totalIvaAmount = 0;

  for (const userInput of userInputs) {
    const productIva = products.find(product => product.code === userInput.code).ivaAmount;
    totalIvaAmount += (productIva * userInput.quantity);
  }

  return parseFloat(totalIvaAmount.toFixed(2));
};

// MUESTRO EN PANTALLA EL IMPORTE TOTAL A PAGAR
const showTotalNetAmount = (totalGrossAmount, totalIvaAmount, sendCost) => {
  alert(`El importe de tu compra es: \n$${totalGrossAmount} (BRUTO) + $${totalIvaAmount} (IVA) + $${sendCost} (ENVÍO) = $${totalGrossAmount + totalIvaAmount + sendCost} (TOTAL)`);
};

const setProductPricesInDOM = (products) => {
  let index = 1;
  const priceFields = document.getElementsByClassName('price_field');

  for(priceField of priceFields) {
    const product = products.find((product) => parseInt(product.code) === index);
    priceField.innerText = `Precio Unitario: $${product.price}`;
    index++;
  }
};

const setProductQuantitiesInDOM = (userInputs) => {
  const quantityFields = document.getElementsByClassName('quantity_field');
  let currentProductCode = 1;

  for(quantityField of quantityFields) {
    let totalQuantity = 0;
    const userInputsByCode = userInputs.filter((userInput) => parseInt(userInput.code) === currentProductCode);
    userInputsByCode.forEach(userInput => totalQuantity += parseInt(userInput.quantity));
    quantityField.value = totalQuantity;
    currentProductCode++;
  }
};

const setProductSubtotalsInDOM = (products, userInputs) => {
  const subtotalFields = document.getElementsByClassName('subtotal_field');
  let currentProductCode = 1;

  for(subtotalField of subtotalFields) {
    let subtotalAmount = 0;
    const productPrice = products.find(product => parseInt(product.code) === currentProductCode).price;
    const userInputsByCode = userInputs.filter((userInput) => parseInt(userInput.code) === currentProductCode);
    userInputsByCode.forEach((userInput) => subtotalAmount += parseInt(userInput.quantity) * productPrice);
    subtotalField.innerText = `Subtotal: $${subtotalAmount}`;
    currentProductCode++;
  }
};

const setInvoicingAmounts = (totalGrossAmount, totalIvaAmount, sendCost) => {
  const subtotalAmountField = document.getElementsByClassName('subtotal_amount_field')[0];
  const taxAmountField = document.getElementsByClassName('tax_field')[0];
  const sendAmountField = document.getElementsByClassName('send_field')[0];
  const totalAmountField = document.getElementsByClassName('total_field')[0];

  subtotalAmountField.innerHTML = `$${totalGrossAmount}`;
  taxAmountField.innerHTML = `$${totalIvaAmount}`;
  sendAmountField.innerHTML = `$${sendCost}`;
  totalAmountField.innerHTML = `$${totalGrossAmount + totalIvaAmount + sendCost}`;
};

// SETEO VALORES EN EL DOM
const setValuesInDOM = (products, userInputs, totalGrossAmount, totalIvaAmount, sendCost) => {
  setProductPricesInDOM(products);
  setProductQuantitiesInDOM(userInputs);
  setProductSubtotalsInDOM(products, userInputs);
  setInvoicingAmounts(totalGrossAmount, totalIvaAmount, sendCost);
}

const createQtyButtons = (productCardQty) => {
  const subtractButtonElement = document.createElement('button');
  subtractButtonElement.setAttribute('type', 'button');
  subtractButtonElement.setAttribute('class', 'btn btn-outline-success');
  subtractButtonElement.innerHTML = '-';
  productCardQty.appendChild(subtractButtonElement);

  const qtyInputElement = document.createElement('input');
  qtyInputElement.setAttribute('type', 'text');
  qtyInputElement.setAttribute('class', 'form-control quantity_field');
  qtyInputElement.setAttribute('placeholder', '0');
  productCardQty.appendChild(qtyInputElement);

  const addButtonElement = document.createElement('button');
  addButtonElement.setAttribute('type', 'button');
  addButtonElement.setAttribute('class', 'btn btn-outline-success');
  addButtonElement.innerHTML = '+';
  productCardQty.appendChild(addButtonElement);
};

const createCardCartButton = (productCardHref) => {
  const cartButtonElement = document.createElement('button');
  cartButtonElement.setAttribute('class', 'add_cart_button');
  cartButtonElement.innerHTML = 'Agregar al Carrito';
  productCardHref.appendChild(cartButtonElement);

};

const setProductCardImage = (productCardElement, product) => {
  const productImageElement = document.createElement('img');
  productImageElement.setAttribute('class', 'card-img-top rounded-circle border');
  productImageElement.setAttribute('alt', '...');
  productImageElement.setAttribute('src', `images/product_${product.code}.jpeg`);

  productCardElement.appendChild(productImageElement);
};

const setProductCardBody = (productCardElement, product) => {
  const productCardBody = document.createElement('div');
  productCardBody.setAttribute('class', 'card-body text-center border border-top-0');
  productCardElement.appendChild(productCardBody);

  const productCardTitle = document.createElement('h5');
  productCardTitle.setAttribute('class', 'card-title');
  productCardTitle.innerHTML = product.description;
  productCardBody.appendChild(productCardTitle);

  const productCardDescription = document.createElement('p');
  productCardDescription.setAttribute('class', 'card-text');
  productCardDescription.innerHTML = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, ratione.';
  productCardBody.appendChild(productCardDescription);

  const productCardQty = document.createElement('div');
  productCardQty.setAttribute('class', 'btn-group mx-5 mb-3');
  productCardQty.setAttribute('role', 'group');
  productCardQty.setAttribute('aria-label', 'Basic outlined button group');
  createQtyButtons(productCardQty);
  productCardBody.appendChild(productCardQty);

  const productCardPrice = document.createElement('p');
  productCardPrice.setAttribute('class', 'price_field');
  productCardPrice.innerHTML = `Precio Unitario: $${product.price}`;
  productCardBody.appendChild(productCardPrice);

  const productCardSubtotal = document.createElement('p');
  productCardSubtotal.setAttribute('class', 'subtotal_field');
  productCardSubtotal.innerHTML = `Subtotal: $${0}`;
  productCardBody.appendChild(productCardSubtotal);

  const productCardHref = document.createElement('a');
  productCardHref.setAttribute('href', '#');
  productCardHref.setAttribute('class', 'btn');
  createCardCartButton(productCardHref);
  productCardBody.appendChild(productCardHref);
};

const createProductCardElement = (product) => {
  const productCardElement = document.createElement('div');
  productCardElement.setAttribute('class', 'card wow flipInY border-0');
  productCardElement.setAttribute('data-wow-delay', '0.2s');
  productCardElement.setAttribute('style', 'width: 18rem;');

  setProductCardImage(productCardElement, product);
  setProductCardBody(productCardElement, product);

  return productCardElement;
};

const createRowElement = () => {
  const rowElement = document.createElement('div');
  rowElement.setAttribute('class', 'products_content_row');

  return rowElement;
};

// CREO DINAMICAMENTE LAS PRODUCT CARDS EN EL DOM
const showProductCardsInDOM = (products) => {
  let index = 0;
  let rowElement;
  const productSectionElement = document.getElementById('products');

  for(product of products) {
    // Cada 4 Product Cards se crea una nueva fila
    if (index % 4 === 0) {
      rowElement = createRowElement();
      productSectionElement.appendChild(rowElement);
    }

    const productCardElement = createProductCardElement(product);
    rowElement.appendChild(productCardElement);
    
    index++;
  }
};

/************ PROGRAMA PRINCIPAL ************/
const products = getProducts();
showProductCardsInDOM(products);
const userInputs = getUserInputs(products);
const totalGrossAmount = calculateTotalGrossAmount(userInputs, products);
const totalIvaAmount = calculateTotalIvaAmount(userInputs, products);
const sendCost = 1000; // HARDCODEO PROVISORIAMENTE EL COSTO DE ENVIO
showTotalNetAmount(totalGrossAmount, totalIvaAmount, sendCost);

// SETEO VALORES EN EL DOM
setValuesInDOM(products, userInputs, totalGrossAmount, totalIvaAmount, sendCost);