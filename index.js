// document.querySelector('.button').onmousemove = (e) => {

// 	const x = e.pageX - e.target.offsetLeft
// 	const y = e.pageY - e.target.offsetTop

// 	e.target.style.setProperty('--x', `${ x }px`)
// 	e.target.style.setProperty('--y', `${ y }px`)
	
// }



// // let valueDisplays = document.querySelectorAll (" .num");
// // let interval = 5000;
// // valueDisplays. forEach ( (valueDisplay) => {
// // let startValue = 0;
// // let endValue = parseInt (valueDisplays.getAttribute
// // ("data-val")) ;
// // let duration = Math. floor (interval / endValue);
// // let counter = setInterval(function () {
// // startValue += 1;
// // valueDisplay. textContent - startValue;
// // if (startValue == endValue) {
// // clearInterval (counter);
// // }
// // }, duration);
// // }) ;



// var acc = document.getElementsByClassName("accordation") ;
// var i ;

// for(i=0; i < acc.length ; i++) {
// 	acc[i].addEventListener("click", function(){
// 		this.classList.toogle("active");
// 		this.parentElement.classList.toogle("active");

// 		var pannel = this.nextElementSibling;

// 		if(pannel.style.display === "block") {
// 			pannel.style.display = "none" ;
// 		} else {
// 			pannel.style.display = "block" ;
// 		}
// 	});
// }

let carts = document.querySelectorAll('.hero_btn');

let products = [
	{
		name: 'Elite Subscription 12 months' ,
		price : 99,
		tag : 'Elite12Months' ,
		inCart : 0
	},
	{
		name: 'Subscription 12 months Premium' ,
		price : 50,
		tag : 'Permium12Months' ,
		inCart : 0
	},
	{
		name: 'Subscription 6 months Premium' ,
		price : 40,
		tag : 'Permium6Months' ,
		inCart : 0
	},
	{
		name: 'Subscription 3 months Premium' ,
		price : 30,
		tag : 'Permium3Months' ,
		inCart : 0
	},
	{
		name: 'Subscription 1 month Premium' ,
		price : 25,
		tag : 'Permium1Months' ,
		inCart : 0
	},
	{
		name: 'Subscription 12 months Standard' ,
		price : 47,
		tag : 'Standard12Months' ,
		inCart : 0
	},
	{
		name: 'Subscription 6 months Standard' ,
		price : 37,
		tag : 'Standard6Months' ,
		inCart : 0
	},
	{
		name: 'Subscription 3 months Standard' ,
		price : 28,
		tag : 'Standard3Months' ,
		inCart : 0
	},
	{
		name: 'Subscription 1 month Standard' ,
		price : 20,
		tag : 'Standard1Months' ,
		inCart : 0
	}
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}


function onLoadCartNumbers() {
	let productNumbers= localStorage.getItem('cartNumbers');

	if(productNumbers && document.querySelector('.cart span')) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

function cartNumbers(product) {
	let productNumbers= localStorage.getItem('cartNumbers');

	productNumbers = parseInt(productNumbers)

	if( productNumbers ) {
		localStorage.setItem('cartNumbers', productNumbers + 1)
		document.querySelector('.cart span').textContent = productNumbers + 1
	} else {
		localStorage.setItem('cartNumbers', 1)
		document.querySelector('.cart span').textContent = 1
	}
	
	setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems) || {}; // Ensure cartItems is initialized to an empty object if it's null

    if (cartItems) {
        if (cartItems[product.tag]) {
            cartItems[product.tag].inCart += 1;
        } else {
            product.inCart = 1;
            cartItems[product.tag] = product;
        }
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = parseFloat(localStorage.getItem('totalCost')) || 0;

    if (isNaN(cartCost)) {
        cartCost = 0;
    }

    cartCost += product.price;

    localStorage.setItem("totalCost", cartCost.toString());
}


function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = parseFloat(localStorage.getItem('totalCost')) || 0;

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=
                `<div class="product">
                    <div class="product_info">
                        <i class="fa-solid fa-trash remove-item" data-tag="${item.tag}"></i>
                        <img src="./images/product.png">
                        <span>${item.name}</span>
                    </div>
                    <div class="price_cart">$${item.price},00</div>
                    <div class="quantity">
                        <i class="fa-solid fa-minus decrease-quantity" data-tag="${item.tag}"></i>
                        ${item.inCart}
                        <i class="fa-solid fa-plus increase-quantity" data-tag="${item.tag}"></i>
                    </div>
                    <div class="total">$${item.inCart * item.price},00</div>
                </div>`;
        });

        // Add event listeners to the icons
        let removeIcons = document.querySelectorAll('.remove-item');
        let decreaseIcons = document.querySelectorAll('.decrease-quantity');
        let increaseIcons = document.querySelectorAll('.increase-quantity');

        removeIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                removeItem(this.getAttribute('data-tag'));
            });
        });

        decreaseIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                updateQuantity(this.getAttribute('data-tag'), -1);
            });
        });

        increaseIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                updateQuantity(this.getAttribute('data-tag'), 1);
            });
        });
    }
}

function updateQuantity(tag, quantityChange) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    cartItems[tag].inCart += quantityChange;

    // Ensure quantity is not negative
    if (cartItems[tag].inCart < 0) {
        cartItems[tag].inCart = 0;
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    displayCart();
}

function removeItem(tag) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let productPrice = cartItems[tag].price * cartItems[tag].inCart;
    let cartCost = parseFloat(localStorage.getItem('totalCost'));

    delete cartItems[tag];
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));

    // Update total cost
    cartCost -= productPrice;
    localStorage.setItem('totalCost', cartCost.toString());

    // Update cart number
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers) - 1;
    localStorage.setItem('cartNumbers', productNumbers.toString());

    displayCart();
}

function addToCart() {
    let productName = document.getElementById('product-name').innerText;
    let productPrice = document.getElementById('add-to-cart').getAttribute('data-price');
    let productQuantity = document.getElementById('product-quantity').value;

    let product = {
        name: productName,
        price: parseFloat(productPrice), // Retrieve price dynamically from data-price attribute
        quantity: parseInt(productQuantity)
    };

    cartNumbers(product);
    totalCost(product);
}





onLoadCartNumbers()
displayCart()