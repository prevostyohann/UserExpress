module.exports = function (user) {
    return `
        <nav>
            <button onclick="window.location.href='/'">Home</button>
            ${user ? `
                <button onclick="window.location.href='/ads'">Ads</button>
                ${user.rights === 'admin' ? `<button onclick="window.location.href='/admin'">Admin</button>` : ''}
                <button onclick="window.location.href='/logout'">Logout</button>
            ` : `
                <button onclick="window.location.href='/login'">Login</button>
                <button onclick="window.location.href='/register'">Register</button>
            `}
        </nav>
    `;
};