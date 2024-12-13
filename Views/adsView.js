const navView = require('./navView');

module.exports = function (ads, user) {
    return `
        ${navView(user)}
        <h1>List of Ads</h1>
        <button onclick="window.location.href='/ads/create'">Create New Ad</button>
        <button onclick="window.location.href='/ads/user'">My Ads</button>
        <button onclick="window.location.href='/favorites'">My Favorites</button>
        <ul>
            ${ads.map(ad => `
                <li>
                    <h2>${ad.title}</h2>
                    <p>${ad.description}</p>
                    <p>Posted by: ${ad.username}</p>
                    <p>Price : ${ad.price} $</p>
                    <button onclick="addToCart(${ad.id})">Add to Cart</button>
                    <button onclick="addFavorite(${ad.id})">Add to Favorite</button>
                </li>
            `).join('')}
        </ul>
        <script>
        function addToCart(adId) {
                fetch('/cart/add/' + adId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                       setTimeout(function() {
                window.location.href = '/ads';
            }, 100);
                    } else {
                        alert('Failed to add item to cart.');
                    }
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                    alert('An error occurred while adding to cart.');
                });
            }

            function addFavorite(adId) {
                fetch('/favorites/add/' + adId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                       setTimeout(function() {
                window.location.href = '/ads';
            }, 100);
                    } else {
                        alert('Failed to add ad to favorites.');
                    }
                })
                .catch(error => {
                    console.error('Error adding favorite:', error);
                    alert('An error occurred while adding to favorites.');
                });
            }
        </script>
    `;
};
