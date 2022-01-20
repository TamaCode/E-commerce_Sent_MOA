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

// ORDENO ARRAY DE PRODUCTOS TENIENDO EN CUENTA EL PRECIO DE LOS MISMOS
const sortProductArrayByCode = (sortType, products) => {
  while(sortType != 'ASCENDENTE' && sortType != 'DESCENDENTE') {
    sortType = prompt(`Ordenamiento inválido. Por favor, escriba ASCENDENTE o DESCENDENTE según corresponda.`).toUpperCase();
  }

  if(sortType === 'ASCENDENTE') {
    products.sort((productA, productB) => productA.code - productB.code);
  } else if (sortType === 'DESCENDENTE'){
    products.sort((productA, productB) => productB.code - productA.code);
  }
};

// CREO LOS OBJETOS PRODUCTOS DISPONIBLES PARA LA VENTA
const getProducts = () => {
  const products = new Array();

  // IMPORTANTE: Los códigos de los productos se deben corresponder con el orden en el que aparecen en el DOM
  products.push(new Product('1', 'Shampoo Sólido', 750));
  products.push(new Product('6', 'Acondicionador Sólido', 850));
  products.push(new Product('3', 'Balsamo Labial', 330));
  products.push(new Product('4', 'Jabón Corporal', 350));
  products.push(new Product('2', 'Desodorante Natural', 500));
  products.push(new Product('5', 'Pasta Dental', 700));
  products.push(new Product('7', 'Jabonera de Madera', 400));
  products.push(new Product('8', 'Bálsamo Mentolado', 300));

  calculateProductIvaAmounts(products);

  const sortType = prompt(`De que forma desea ordenar la lista de precios de productos? Escriba ASCENDENTE o DESCENDENTE según corresponda.`).toUpperCase();
  sortProductArrayByCode(sortType, products);

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

  userInput.code = prompt(`Ingrese el código del producto que desea agregar a su Carrito de Compras. Al finalizar presione la tecla ESC para calcular el importe total de su Compra.\n\n${productList}`);

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
const showTotalNetAmount = (totalGrossAmount, totalIvaAmount) => {
  alert(`El importe de tu compra es: \n$${totalGrossAmount} (BRUTO) + $${totalIvaAmount} (IVA) = $${totalGrossAmount + totalIvaAmount} (TOTAL)`);
};

const setProductPricesInDOM = (products) => {
  let index = 1;
  const priceFields = document.getElementsByClassName('price_text');

  for(priceField of priceFields) {
    const product = products.find((product) => parseInt(product.code) === index);
    priceField.innerText = `Precio Unitario: $${product.price}`;
    index++;
  }
};

const setValuesInDOM = (products, userInputs) => {
  setProductPricesInDOM(products);
  // setProductQuantitiesInDOM();
  // setProductSubtotalsInDOM();
}

/************ PROGRAMA PRINCIPAL ************/
const products = getProducts();
const userInputs = getUserInputs(products);
const totalGrossAmount = calculateTotalGrossAmount(userInputs, products);
const totalIvaAmount = calculateTotalIvaAmount(userInputs, products);
showTotalNetAmount(totalGrossAmount, totalIvaAmount);

// SETEO VALORES EN EL DOM
setValuesInDOM(products, userInputs);