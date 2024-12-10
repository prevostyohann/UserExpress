function authMiddleware(req, res, next) {
    // Simuler un utilisateur connecté pour l'exemple
    req.user = { id: 1, username: 'toto', rights: 'admin' }; // Remplacez ceci par votre logique d'authentification réelle
    next();
}

function adminMiddleware(req, res, next) {
    if (req.user && req.user.rights === 'admin') {
        next();
    } else {
        res.status(403).send('Access denied. Admins only.');
    }
}

module.exports = { authMiddleware, adminMiddleware };