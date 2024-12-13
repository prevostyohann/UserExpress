const navView = require('./navView');

module.exports = function (cartItems, user) {
    return `
        ${navView(user)}
        <h1>Your Cart</h1>
        <ul>
            ${cartItems.map(item => `
                <li>
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price per item: ${item.price} $</p>
                    <p>Total price: ${item.totalPrice} $</p>
                    <button onclick="removeFromCart(${item.id})">Remove from Cart</button>
                </li>
            `).join('')}
        </ul>
        <button onclick="approveCart()">Order</button>
        <script>
            function removeFromCart(adId) {
                fetch('/cart/remove/' + adId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setTimeout(function() {
                window.location.href = '/cart';
            }, 100);
                        
                    } else {
                        alert('Failed to remove item from cart.');
                    }
                })
                .catch(error => {
                    console.error('Error removing from cart:', error);
                    alert('An error occurred while removing from cart.');
                });
            }
        </script>
    `;
};