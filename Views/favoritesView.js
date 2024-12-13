const navView = require('./navView');

module.exports = function (user, favorites) {
    console.log('Rendering favorites view with data:', favorites); // Log the data
    return `
        ${navView(user)}
        <h1>List of Favorites</h1>
        <ul>
            ${Array.isArray(favorites) && favorites.length > 0 ? favorites.map(ad => `
                <li>
                    <h2>${ad.title}</h2>
                    <p>${ad.description}</p>
                    <p>Price : ${ad.price} $</p>
                    <p>Posted by: ${ad.username}</p>
                    <button onclick="removeFavorite(${ad.id})">Remove from Favorites</button>
                </li>
            `).join('') : '<p>No favorites found.</p>'}
        </ul>
        <script>
            function removeFavorite(adId) {
                fetch('/favorites/remove/' + adId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {    
                setTimeout(function() {
                window.location.href = '/favorites';
            }, 100);
                    } else {
                        alert('Failed to remove ad from favorites.');
                    }
                })
                .catch(error => {
                    console.error('Error removing favorite:', error);
                    alert('An error occurred while removing from favorites.');
                });
            }
        </script>
    `;
};