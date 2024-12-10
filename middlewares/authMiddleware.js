function authMiddleware(req, res, next) {
    const userCookie = req.cookies.user;
    if (userCookie) {
        req.user = JSON.parse(userCookie); // Assurez-vous que les informations de l'utilisateur sont stockées dans un cookie
    } else {
        req.user = null;
    }
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