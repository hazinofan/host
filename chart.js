function addToCart(button) {
    // Get product information from data attributes
    var productName = button.getAttribute("data-name");
    var productPrice = parseFloat(button.getAttribute("data-price"));
    var productQuantity = parseInt(document.getElementById("product-quantity").value);

    // Calculate subtotal for the current product
    var subTotal = productPrice * productQuantity;

    // Create a new row in the cart table
    var cartRow = document.createElement("tr");
    cartRow.innerHTML = `
        <td>${productName}</td>
        <td>${productQuantity}</td>
        <td>${subTotal} €</td>
    `;

    // Append the new row to the cart table
    var cartTable = document.getElementById("cart-table");
    cartTable.appendChild(cartRow);

    // Update the total price in the cart
    updateTotalPrice(subTotal);
}

function updateTotalPrice(amount) {
    // Get the total price element
    var totalPriceElement = document.getElementById("total-price");

    // Get the current total price
    var currentTotalPrice = parseFloat(totalPriceElement.textContent.replace("€", ""));

    // Update the total price by adding the new product's subtotal
    currentTotalPrice += amount;

    // Set the updated total price in the element
    totalPriceElement.textContent = currentTotalPrice + " €";
}
