const Ad = require("../Models/Ad");
const db = require('../db/db');
const adsView = require('../Views/adsView');
const createAdView = require('../Views/createAdView');
const pendingAdsView = require('../Views/pendingAdsView');
const userAdsView = require('../Views/userAdsView');
const allAdsView = require('../Views/allAdsView');

function redirectScript(url, delay) {
    return `
        <script>
            setTimeout(function() {
                window.location.href = '${url}';
            }, ${delay});
        </script>
    `;
}

function showAds(req, res) {
    const query = `
        SELECT ads.*, users.username 
        FROM ads 
        JOIN users ON ads.userId = users.id 
        WHERE ads.isApproved = 1
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching ads: ', err.message);
            res.send('Error loading ads');
        } else {
            res.send(adsView(rows, req.user));
        }
    });
}

function showCreateAd(req, res) {
    res.send(createAdView(req.user.id));
}

function createAd(req, res) {
    const { title, description, userId } = req.body;
    const query = `INSERT INTO ads(title, description, userId) VALUES (?, ?, ?)`;
    db.run(query, [title, description, userId], function (err) {
        if (err) {
            console.error('Error creating ad: ', err.message);
            res.send('Error creating ad');
        } else {
            res.send(`
                <p>Ad created successfully, pending approval</p>
                <p>You will be redirected to the ads page in 1 seconds...</p>
                ${redirectScript('/ads', 1000)}
            `);
        }
    });
}

function approveAd(req, res) {
    const adId = req.params.id;
    const query = `UPDATE ads SET isApproved = 1 WHERE id = ?`;
    db.run(query, [adId], function (err) {
        if (err) {
            console.error('Error approving ad: ', err.message);
            res.send('Error approving ad');
        } else {
            res.send(`
                <p>Ad approved successfully</p>
                <p>You will be redirected to the admin panel page in 1 seconds...</p>
                ${redirectScript('/admin', 1000)}
            `);
        }
    });
}

function disapproveAd(req, res) {
    const adId = req.params.id;
    const query = `DELETE FROM ads WHERE id = ?`;
    db.run(query, [adId], function (err) {
        if (err) {
            console.error('Error disapproving ad: ', err.message);
            res.send('Error disapproving ad');
        } else {
            res.send(`
                <p>Ad deleted successfully</p>
                <p>You will be redirected to the admin panel page in 1 seconds...</p>
                ${redirectScript('/admin', 1000)}
            `);
        }
    });
}

function deleteAd(req, res) {
    const adId = req.params.id;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;

    console.log(`Attempting to delete ad with ID: ${adId} by user ID: ${userId} (Admin: ${isAdmin})`);

    const query = isAdmin ? `DELETE FROM ads WHERE id = ?` : `DELETE FROM ads WHERE id = ? AND userId = ?`;
    const params = isAdmin ? [adId] : [adId, userId];

    db.run(query, params, function (err) {
        if (err) {
            console.error('Error deleting ad: ', err.message);
            res.send('Error deleting ad');
        } else {
            if (this.changes > 0) {
                res.send(`
                    <p>Ad deleted successfully</p>
                    <p>You will be redirected in 1 second...</p>
                    ${redirectScript(isAdmin ? '/admin' : '/ads/user', 1000)}
                `);
            } else {
                res.send(`
                    <p>Ad not found or you do not have permission to delete it</p>
                    <p>You will be redirected in 1 seconds...</p>
                    ${redirectScript(isAdmin ? '/admin' : '/ads/user', 1000)}
                `);
            }
        }
    });
}

function showPendingAds(req, res) {
    const query = `SELECT * FROM ads WHERE isApproved = 0`;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching pending ads: ', err.message);
            res.send('Error loading pending ads');
        } else {
            res.send(pendingAdsView(rows));
        }
    });
}

function showUserAds(req, res) {
    const userId = req.user.id;
    const query = `
        SELECT ads.*, users.username 
        FROM ads 
        JOIN users ON ads.userId = users.id 
        WHERE ads.userId = ?
    `;
    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.error('Error fetching user ads: ', err.message);
            res.send('Error loading user ads');
        } else {
            res.send(userAdsView(rows, req.user));
        }
    });
}

function showAllAds(req, res) {
    const query = `
        SELECT ads.*, users.username 
        FROM ads 
        JOIN users ON ads.userId = users.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching all ads: ', err.message);
            res.send('Error loading all ads');
        } else {
            res.send(allAdsView(rows, req.user));
        }
    });
}

module.exports = { showAds, showCreateAd, createAd, approveAd, deleteAd, showPendingAds, disapproveAd, showUserAds, showAllAds };