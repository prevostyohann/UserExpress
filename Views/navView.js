module.exports = function (user) {
    console.log('User:', user); // Ajoutez ce log pour vérifier l'objet utilisateur
    return `
        <nav>
            <button onclick="window.location.href='/'" aria-label="Home">Home</button>
            ${user ? `
                <button onclick="window.location.href='/ads'" aria-label="Ads">Ads</button>
                ${user.isAdmin ? `<button onclick="window.location.href='/admin'" aria-label="Admin">Admin</button>` : ''}
                 <button onclick="window.location.href='/cart'">My Cart</button>
                <button onclick="window.location.href='/logout'" aria-label="Logout">Logout</button>
            ` : `
                <button onclick="window.location.href='/login'" aria-label="Login">Login</button>
                <button onclick="window.location.href='/register'" aria-label="Register">Register</button>
            `}
        </nav>
    `;
};