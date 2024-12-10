const express = require('express');
const { getUser, showLogin, traitLogin, showRegister, traitRegister, showAdminPanel, showEditUser, updateUser, deleteUser } = require('./Controllers/UserController');
const { showAds, showCreateAd, createAd, approveAd, deleteAd, showPendingAds, disapproveAd } = require('./Controllers/AdController');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { authMiddleware, adminMiddleware } = require('./middlewares/authMiddleware');
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3003, () => {
    console.log("Server is running on port 3003");
});

// Utiliser le middleware d'authentification
app.use(authMiddleware);

app.get('/user', getUser);
app.get('/login', showLogin);
app.post('/login', traitLogin);
app.get('/register', showRegister);
app.post('/register', traitRegister);

// Admin routes avec middleware admin
app.get('/admin', adminMiddleware, showAdminPanel);
app.get('/admin/edit/:id', adminMiddleware, showEditUser);
app.post('/admin/update', adminMiddleware, updateUser);
app.get('/admin/delete/:id', adminMiddleware, deleteUser);
app.get('/admin/pending-ads', adminMiddleware, showPendingAds);

// Ad routes
app.get('/ads', showAds);
app.get('/ads/create', showCreateAd);
app.post('/ads', createAd);
app.post('/ads/approve/:id', approveAd);
app.post('/ads/disapprove/:id', disapproveAd);
app.get('/ads/delete/:id', deleteAd);