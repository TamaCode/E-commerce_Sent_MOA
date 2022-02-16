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

const sendCostByProvince = {
  caba: '50.00',
  buenosaires: '100.00',
  catamarca: '200.00',
  chaco: '200.00',
  chubut: '400.00',
  cordoba: '150.00',
  corrientes: '200.00',
  entrerios: '150.00',
  formosa: '200.00',
  jujuy: '400.00',
  lapampa: '300.00',
  larioja: '300.00',
  mendoza: '400.00',
  misiones: '400.00',
  neuquen: '500.00',
  rionegro: '500.00',
  salta: '350.00',
  sanjuan: '400.00',
  sanluis: '400.00',
  santacruz: '500.00',
  santafe: '200.00',
  santiagodelestero: '200.00',
  tierradelfuego: '600.00',
  tucuman: '300.00'
};


const productPurchases = {};


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

// CALCULO EL MONTO BRUTO A PAGAR
const calculateTotalGrossAmount = () => {
  let totalGrossAmount = 0;

  for (const productCode in productPurchases) {
    if (productPurchases[productCode].addedToCart) {
      totalGrossAmount += productPurchases[productCode].subtotalValue;
    }
  }

  return totalGrossAmount;
};

const createConfirmationContentElement = (currentCartButtonElement) => {
  const addedConfirmationContentElement = document.createElement('div');
  addedConfirmationContentElement.setAttribute('class', 'added_confirmation_content');
  currentCartButtonElement.parentNode.appendChild(addedConfirmationContentElement);

  const addedConfirmationImgContentElement = document.createElement('div');
  addedConfirmationImgContentElement.setAttribute('class', 'added_confirmation_image_content');
  addedConfirmationContentElement.appendChild(addedConfirmationImgContentElement);

  const addedConfirmationImageElement = document.createElement('img');
  addedConfirmationImageElement.setAttribute('class', 'added_confirmation_image');
  addedConfirmationImageElement.setAttribute('src', 'images/check-mark.png');
  addedConfirmationImgContentElement.appendChild(addedConfirmationImageElement);

  const addedConfirmationTextElement = document.createElement('p');
  addedConfirmationTextElement.setAttribute('class', 'added_confirmation_text');
  addedConfirmationTextElement.innerHTML = 'Producto Agregado!';
  addedConfirmationContentElement.appendChild(addedConfirmationTextElement);
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

  const productCardCode = document.createElement('p');
  productCardCode.setAttribute('class', 'product_code');
  productCardCode.innerHTML = `${product.code}`;
  productCardBody.appendChild(productCardCode);

  const cartButtonElement = document.createElement('button');
  cartButtonElement.setAttribute('class', 'add_cart_button');
  cartButtonElement.innerHTML = 'Agregar al Carrito';
  productCardBody.appendChild(cartButtonElement);

  createConfirmationContentElement(cartButtonElement);
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


//LAS CARDS SE CREAN DINAMICAMENTE POR CODIGO. 4 CARDS POR FILA. SE DEJA EJEMPLO DE ESTRUCTURA:

/*
<div class="products_content_row">
  <div class="card wow flipInY border-0" data-wow-delay="0.2s" style="width: 18rem;">
    <img src="images/shampoo.jpeg" class="card-img-top rounded-circle border" alt="...">
    <div class="card-body text-center border border-top-0">
      <h5 class="card-title">Shampoo Sólido</h5>
      <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, ratione.</p>
      <div class="btn-group mx-5 mb-3" role="group" aria-label="Basic outlined button group">
        <button type="button" class="btn btn-outline-success">-</button>
        <input type="text" class="form-control quantity_field" placeholder="0">
        <button type="button" class="btn btn-outline-success">+</button>
      </div>
      <p class="price_field"></p>
      <p class="subtotal_field">Subtotal: $0</p>
      <button class="add_cart_button">Agregar al Carrito</button>
      <div class="added_confirmation_content">
        <div class="added_confirmation_image_content">
          <img class="added_confirmation_image" src="images/check-mark.png">
        </div>
        <p class="added_confirmation_text">Producto Agregado!</p>
      </div>
    </div>
  </div>
</div> 
*/
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
  const productCode = quantityInputElement.parentNode.parentNode.childNodes[5].innerHTML;
  const quantityValue = parseInt(quantityInputElement.value);
  const priceValue = getPriceValue(priceElement);
  const subtotalValue = quantityValue * priceValue;

  productPurchases[productCode] = {subtotalValue, addedToCart: false};
  
  subtotalElement.innerHTML = `Subtotal: $${subtotalValue}`;
};


const updateQuantity = (operation, quantityInputElement) => {
  let quantityValue = parseInt(quantityInputElement.value);

  if (operation === 'add') {
    quantityValue++;
  } else {
    quantityValue > 0 ? quantityValue-- : null;
  }

  quantityInputElement.value = quantityValue;
};


const validateQtyInputValue = (quantityInputElement) => {
  let quantityValue = quantityInputElement.value;

  if (!quantityValue) {
    quantityInputElement.value = 0;
  }

  if (isNaN(quantityValue) || quantityValue < 0) {
    alert('La cantidad a comprar debe ser un número positivo');
    quantityInputElement.value = 0;
  }
};


const setQuantityButtonsEventListener = () => {
  const addButtonElements = document.getElementsByClassName('add-button');
  const subButtonElements = document.getElementsByClassName('sub-button');

  for(addButtonElement of addButtonElements) {
    addButtonElement.addEventListener('click', (event) => {
      const quantityInputElement = event.target.parentNode.childNodes[1];
      const addCartButtonElement = event.target.parentNode.parentNode.childNodes[6];
      const confirmationContentElement = event.target.parentNode.parentNode.childNodes[7];

      updateQuantity('add', quantityInputElement);
      updateSubtotal(quantityInputElement);

      addCartButtonElement.setAttribute('style', 'display:inline-block');
      confirmationContentElement.setAttribute('style', 'display:none');
    });
  }

  for(subButtonElement of subButtonElements) {
    subButtonElement.addEventListener('click', (event) => {
      const quantityInputElement = event.target.parentNode.childNodes[1];
      const addCartButtonElement = event.target.parentNode.parentNode.childNodes[6];
      const confirmationContentElement = event.target.parentNode.parentNode.childNodes[7];

      updateQuantity('sub', quantityInputElement);
      updateSubtotal(quantityInputElement);

      addCartButtonElement.setAttribute('style', 'display:inline-block');
      confirmationContentElement.setAttribute('style', 'display:none');
    });
  }
};


const setInvoicingAmountsInDOM = (invoicingAmounts) => {
  const grossAmountElement = document.getElementsByClassName('subtotal_amount_field')[0];
  const ivaAmountElement = document.getElementsByClassName('tax_field')[0];
  const sendAmountElement = document.getElementsByClassName('send_field')[0];
  const netAmountElement = document.getElementsByClassName('total_field')[0];

  grossAmountElement.innerHTML = `$${invoicingAmounts.totalGrossAmount.toFixed(2)}`;
  ivaAmountElement.innerHTML = `$${invoicingAmounts.totalIvaAmount.toFixed(2)}`;
  sendAmountElement.innerHTML = `$${invoicingAmounts.sendCost}`;
  netAmountElement.innerHTML = `$${invoicingAmounts.totalNetAmount.toFixed(2)}`;
};


const calculateInvoicingAmounts = () => {
  const invoicingAmounts = {};
  invoicingAmounts.totalGrossAmount = calculateTotalGrossAmount();
  invoicingAmounts.totalIvaAmount = invoicingAmounts.totalGrossAmount * 0.21;
  invoicingAmounts.sendCost = invoicingAmounts.totalGrossAmount == 0 ? '0.00' : getSendCost();
  invoicingAmounts.totalNetAmount = invoicingAmounts.totalGrossAmount + invoicingAmounts.totalIvaAmount + parseFloat(invoicingAmounts.sendCost);

  return invoicingAmounts;
};


const setCartButtonEventListener = () => {
  const cartButtonElements = document.getElementsByClassName('add_cart_button');

  for(cartButtonElement of cartButtonElements) {
    cartButtonElement.addEventListener('click', (event) => {
      const currentCartButtonElement = event.target;
      const currentConfirmationContentElement = currentCartButtonElement.parentNode.childNodes[7];
      const productCode = currentCartButtonElement.parentNode.childNodes[5].innerHTML;

      if (productPurchases[productCode]) {
        productPurchases[productCode].addedToCart = true;

        const invoicingAmounts = calculateInvoicingAmounts();
        setInvoicingAmountsInDOM(invoicingAmounts);

        currentCartButtonElement.setAttribute('style', 'display:none');
        currentConfirmationContentElement.setAttribute('style', 'display:flex');
      } else {
        alert('Para poder agregar un producto al carrito debe al menos haber solicitado una unidad del mismo.');
      }
    });
  }
};


const setQuantityInputEventListener = () => {
  const qtyInputElements = document.getElementsByClassName('quantity_field');

  for(qtyInputElement of qtyInputElements) {
    qtyInputElement.addEventListener('change', (event) => {
      const quantityInputElement = event.target;
      const addCartButtonElement = event.target.parentNode.parentNode.childNodes[6];
      const confirmationContentElement = event.target.parentNode.parentNode.childNodes[7];

      validateQtyInputValue(quantityInputElement);
      updateSubtotal(quantityInputElement);

      addCartButtonElement.setAttribute('style', 'display:inline-block');
      confirmationContentElement.setAttribute('style', 'display:none');
    });
  }
};


const getSendCost = () => {
  const provinceInputElement = document.getElementById('province');
  const provinceInputValue = provinceInputElement.value;

  return sendCostByProvince[provinceInputValue];
};


const setProvinceSelectEventListener = () => {
  const provinceInputElement = document.getElementById('province');

  // Inicializo el costo de envío con la provincia seleccionada por defecto
  const sendCostElement = document.getElementsByClassName('send_cost')[0];
  sendCostElement.innerHTML = getSendCost();
  
  provinceInputElement.addEventListener('change', (event) => {
    const sendCost = getSendCost();
    const sendCostElement = document.getElementsByClassName('send_cost')[0]; // Elemento de la seccion envio
    const grossAmountElement = document.getElementsByClassName('subtotal_amount_field')[0]; // Elemento de la seccion facturacion
    sendCostElement.innerHTML = sendCost;

    if (grossAmountElement.innerHTML != '$0.00') {
      const invoicingAmounts = calculateInvoicingAmounts(); // Recalculamos el importe a pagar con el costo de envio nuevo segun pcia seleccionada
      setInvoicingAmountsInDOM(invoicingAmounts);
    }
  });
};


const setEventListenerInDOM = () => {
  setQuantityButtonsEventListener();
  setQuantityInputEventListener();
  setCartButtonEventListener();
  setProvinceSelectEventListener();
};

/************ PROGRAMA PRINCIPAL ************/
// Agrego comentario desde git
const products = getProducts();
createProductCardsInDOM(products);
setEventListenerInDOM();
// test branch
