const db = require('../db/db');
const cartView = require('../Views/cartView');

function addToCart(req, res) {
    const userId = req.user.id;
    const adId = req.params.adId;
    const query = `
        INSERT INTO cart(userId, adId, quantity) 
        VALUES (?, ?, 1) 
        ON CONFLICT(userId, adId) 
        DO UPDATE SET quantity = quantity + 1
    `;

    db.run(query, [userId, adId], function (err) {
        if (err) {
            console.error('Error adding to cart: ', err.message);
            res.status(500).send('Error adding to cart');
        } else {
            res.json({ success: true });
        }
    });
}

function removeFromCart(req, res) {
    const userId = req.user.id;
    const adId = req.params.adId;
    const query = `DELETE FROM cart WHERE userId = ? AND adId = ?`;

    db.run(query, [userId, adId], function (err) {
        if (err) {
            console.error('Error removing from cart: ', err.message);
            res.status(500).send('Error removing from cart');
        } else {
            res.json({ success: true });
        }
    });
}

function showCart(req, res) {
    const userId = req.user.id;
    const query = `
        SELECT ads.*, cart.quantity, (ads.price * cart.quantity) AS totalPrice
        FROM cart 
        JOIN ads ON cart.adId = ads.id 
        WHERE cart.userId = ?
    `;

    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.error('Error fetching cart: ', err.message);
            res.status(500).send('Error loading cart');
        } else {
            res.send(cartView(rows, req.user));
        }
    });
}

module.exports = { addToCart, removeFromCart, showCart };