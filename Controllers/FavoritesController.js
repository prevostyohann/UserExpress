const db = require('../db/db');
const favoritesView = require('../Views/favoritesView');


function redirectScript(url, delay) {
    return `
        <script>
            setTimeout(function() {
                window.location.href = '${url}';
            }, ${delay});
        </script>
    `;
}

function addFavorite(req, res) {
    const userId = req.user.id;
    const adId = req.params.adId;
    const query = `INSERT INTO favorites(userId, adId) VALUES (?, ?)`;

    db.run(query, [userId, adId], function (err) {
        if (err) {
            console.error('Error adding favorite: ', err.message);
            res.status(500).send('Error adding favorite');
        } else {
            res.json({ success: true });
        }
    });
}

function removeFavorite(req, res) {
    const userId = req.user.id;
    const adId = req.params.adId;
    const query = `DELETE FROM favorites WHERE userId = ? AND adId = ?`;

    db.run(query, [userId, adId], function (err) {
        if (err) {
            console.error('Error removing favorite: ', err.message);
            res.status(500).send('Error removing favorite');
        } else {
            res.json({ success: true });
        }
    });
}

function showFavorites(req, res) {
    const userId = req.user.id;
    const query = `
        SELECT ads.*, users.username 
        FROM favorites 
        JOIN ads ON favorites.adId = ads.id 
        JOIN users ON ads.userId = users.id 
        WHERE favorites.userId = ?
    `;

    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.error('Error fetching favorites: ', err.message);
            res.status(500).send('Error loading favorites');
        } else {
            console.log('Favorites fetched:', rows); // Log the result
            const favorites = Array.isArray(rows) ? rows : [];
            res.send(favoritesView(req.user, favorites));
        }
    });
}

module.exports = { addFavorite, removeFavorite, showFavorites, redirectScript };