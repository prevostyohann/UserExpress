const userView = require("../Views/userView");
const loginView = require("../Views/loginView");
const registerView = require('../Views/registerView');
const adminView = require('../Views/adminView');
const editUserView = require('../views/editUserView');
const homeView = require('../Views/homeView');
const db = require('../db/db');
const bcrypt = require('bcrypt');

const User = require("../Models/User");

function getUser(req, res) {
    const user = new User(1, 'toto');
    res.send(userView(user));
}

function showLogin(req, res) {
    res.send(loginView());
}

function showRegister(req, res) {
    res.send(registerView());
}

function traitLogin(req, res) {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = ?`;

    db.get(query, [username], function (err, row) {
        if (err) {
            console.error('echec connexion : ', err.message);
            res.send('mauvais mot de passe');
        } else if (row && bcrypt.compareSync(password, row.password)) {
            console.log('connecté', username);
            // Stocker les informations de l'utilisateur dans un cookie
            res.cookie('user', JSON.stringify({ id: row.id, username: row.username, rights: row.rights }), { httpOnly: true });
            res.redirect('/');
        } else {
            res.send('mauvais mot de passe');
        }
    });
}

function traitRegister(req, res) {
    const { username, password } = req.body;

    console.log('Request body:', req.body);

    if (!username || !password) {
        res.status(400).send('Username and password are required');
        return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = `INSERT INTO users(username, password) VALUES (?, ?)`;

    db.run(query, [username, hashedPassword], function (err) {
        if (err) {
            console.error('echec enregistrement: ', err.message);
            res.send('ERROR');
        } else {
            console.log('user success', username);
            res.send('register succes');
        }
    });
}

function showHome(req, res) {
    res.send(homeView(req.user));
}

// Function to display the admin panel
function showAdminPanel(req, res) {
    const query = `SELECT * FROM users`;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching users: ', err.message);
            res.send('Error loading admin panel');
        } else {
            res.send(adminView(rows, req.user));
        }
    });
}

// Function to display the edit user form
function showEditUser(req, res) {
    const userId = req.params.id;
    const query = `SELECT * FROM users WHERE id = ?`;
    db.get(query, [userId], (err, row) => {
        if (err) {
            console.error('Error fetching user: ', err.message);
            res.send('Error loading user details');
        } else {
            res.send(editUserView(row));
        }
    });
}

// Function to handle updating user rights
function updateUser(req, res) {
    const { id, username, rights } = req.body;
    const query = `UPDATE users SET username = ?, rights = ? WHERE id = ?`;
    db.run(query, [username, rights, id], function (err) {
        if (err) {
            console.error('Error updating user: ', err.message);
            res.send('Error updating user');
        } else {
            res.send('User updated successfully');
        }
    });
}

// Function to handle deleting a user
function deleteUser(req, res) {
    const userId = req.params.id;
    const query = `DELETE FROM users WHERE id = ?`;
    db.run(query, [userId], function (err) {
        if (err) {
            console.error('Error deleting user: ', err.message);
            res.send('Error deleting user');
        } else {
            res.send('User deleted successfully');
        }
    });
}

module.exports = { getUser, showLogin, traitLogin, showRegister, traitRegister, showAdminPanel, showEditUser, updateUser, deleteUser, showHome };