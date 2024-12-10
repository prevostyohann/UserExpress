const navView = require('./navView');

module.exports = function (user) {
    return `
        ${navView(user)}
        <h1>Welcome to the Home Page</h1>
    `;
};