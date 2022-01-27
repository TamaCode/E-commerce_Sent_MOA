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
  
  // products.sort((productA, productB) => productA.code - productB.code); // ORDENO ARRAY DE PRODUCTOS SEGÚN EL CÓDIGO DE LOS MISMOS
  calculateProductIvaAmounts(products);

  return products;
};


const getSubtotalValue = (subtotalElement) => {
  const subtotalArray = subtotalElement.innerHTML.split('$');
  const subtotalValue = subtotalArray[subtotalArray.length - 1];

  return parseFloat(subtotalValue);
};


// CALCULO EL MONTO BRUTO A PAGAR
const calculateTotalGrossAmount = () => {
  let totalGrossAmount = 0;
  const subtotalElements = document.getElementsByClassName('subtotal_field');

  for (const subtotalElement of subtotalElements) {
    const subtotalValue = getSubtotalValue(subtotalElement);
    totalGrossAmount += subtotalValue;
  }

  return totalGrossAmount;
};


const createQtyButtons = (productCardQty) => {
  const subtractButtonElement = document.createElement('button');
  subtractButtonElement.setAttribute('type', 'button');
  subtractButtonElement.setAttribute('class', 'btn btn-outline-success sub-button');
  subtractButtonElement.innerHTML = '-';
  productCardQty.appendChild(subtractButtonElement);

  const qtyInputElement = document.createElement('input');
  qtyInputElement.setAttribute('type', 'text');
  qtyInputElement.setAttribute('class', 'form-control quantity_field');
  // qtyInputElement.setAttribute('placeholder', '0');
  qtyInputElement.value = '0';
  productCardQty.appendChild(qtyInputElement);

  const addButtonElement = document.createElement('button');
  addButtonElement.setAttribute('type', 'button');
  addButtonElement.setAttribute('class', 'btn btn-outline-success add-button');
  addButtonElement.innerHTML = '+';
  productCardQty.appendChild(addButtonElement);
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

  const cartButtonElement = document.createElement('button');
  cartButtonElement.setAttribute('class', 'add_cart_button');
  cartButtonElement.innerHTML = 'Agregar al Carrito';
  productCardBody.appendChild(cartButtonElement);
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
const createProductCardsInDOM = (products) => {
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


const getPriceValue = (priceElement) => {
  const priceElementInner = priceElement.innerHTML;
  const priceElementInnerArray = priceElementInner.split('$');
  const priceValue = priceElementInnerArray[priceElementInnerArray.length - 1];

  return parseFloat(priceValue);
};


const updateSubtotal = (quantityInputElement) => {
  const priceElement = quantityInputElement.parentNode.parentNode.childNodes[3];
  const subtotalElement = quantityInputElement.parentNode.parentNode.childNodes[4];
  const quantityValue = parseInt(quantityInputElement.value);
  const priceValue = getPriceValue(priceElement);

  subtotalElement.innerHTML = `Subtotal: $${quantityValue * priceValue}`;
};


const updateQuantity = (operation, quantityInputElement) => {
  let quantityValue = parseInt(quantityInputElement.value);

  if (operation === 'sum') {
    quantityValue++;
  } else {
    quantityValue > 0 ? quantityValue-- : null;
  }

  quantityInputElement.value = quantityValue;
};


const setQuantityButtonsEventListener = () => {
  const addButtonElements = document.getElementsByClassName('add-button');
  const subButtonElements = document.getElementsByClassName('sub-button');

  for(addButtonElement of addButtonElements) {
    addButtonElement.addEventListener('click', (event) => {
      const quantityInputElement = event.target.parentNode.childNodes[1];
      updateQuantity('sum', quantityInputElement);
      updateSubtotal(quantityInputElement);
    });
  }

  for(subButtonElement of subButtonElements) {
    subButtonElement.addEventListener('click', (event) => {
      const quantityInputElement = event.target.parentNode.childNodes[1];
      updateQuantity('sub', quantityInputElement);
      updateSubtotal(quantityInputElement);
    });
  }
};


const setInvoicingAmountsInDOM = (totalGrossAmount, totalIvaAmount, sendCost, totalNetAmount) => {
  const grossAmountElement = document.getElementsByClassName('subtotal_amount_field')[0];
  const ivaAmountElement = document.getElementsByClassName('tax_field')[0];
  const sendAmountElement = document.getElementsByClassName('send_field')[0];
  const netAmountElement = document.getElementsByClassName('total_field')[0];

  grossAmountElement.innerHTML = `$${totalGrossAmount}`;
  ivaAmountElement.innerHTML = `$${totalIvaAmount}`;
  sendAmountElement.innerHTML = `$${sendCost}`;
  netAmountElement.innerHTML = `$${totalNetAmount}`;
};


const setCartButtonEventListener = () => {
  const cartButtonElements = document.getElementsByClassName('add_cart_button');

  for(cartButtonElement of cartButtonElements) {
    cartButtonElement.addEventListener('click', () => {
      const totalGrossAmount = calculateTotalGrossAmount();
      const totalIvaAmount = totalGrossAmount * 0.21;
      const sendCost = 1000;
      const totalNetAmount = totalGrossAmount + totalIvaAmount + sendCost;
      setInvoicingAmountsInDOM(totalGrossAmount, totalIvaAmount, sendCost, totalNetAmount);
    });
  }
};

const setQuantityInputEventListener = () => {
  const qtyInputElements = document.getElementsByClassName('quantity_field');

  for(qtyInputElement of qtyInputElements) {
    qtyInputElement.addEventListener('change', (event) => {
      const quantityInputElement = event.target;
      updateSubtotal(quantityInputElement);
    });
  }
};


const setEventListenerInDOM = () => {
  setQuantityButtonsEventListener();
  setQuantityInputEventListener();
  setCartButtonEventListener();
};

/************ PROGRAMA PRINCIPAL ************/
const products = getProducts();
createProductCardsInDOM(products);
setEventListenerInDOM();