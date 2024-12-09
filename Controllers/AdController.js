const Ad = require("../Models/Ad");
const db = require('../db/db');
const adsView = require('../Views/adsView');
const createAdView = require('../Views/createAdView');
const pendingAdsView = require('../Views/pendingAdsView');

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
                <p>You will be redirected to the ads page in 5 seconds...</p>
                <script>
                    setTimeout(function() {
                        window.location.href = '/ads';
                    }, 5000);
                </script>
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
            <p>Ad created successfully</p>
            <p>You will be redirected to the ads page in 5 seconds...</p>
            <script>
                setTimeout(function() {
                    window.location.href = '/admin';
                }, 5000);
            </script>
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
                <p>You will be redirected to the ads page in 5 seconds...</p>
                <script>
                    setTimeout(function() {
                        window.location.href = '/admin';
                    }, 5000);
                </script>
            `);
        }
    });
}

function deleteAd(req, res) {
    const adId = req.params.id;
    const query = `DELETE FROM ads WHERE id = ?`;
    db.run(query, [adId], function (err) {
        if (err) {
            console.error('Error deleting ad: ', err.message);
            res.send('Error deleting ad');
        } else {
            res.send('Ad deleted successfully');
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

module.exports = { showAds, showCreateAd, createAd, approveAd, deleteAd, showPendingAds, disapproveAd };