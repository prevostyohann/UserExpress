const navView = require('./navView');

module.exports = function (users, user) {
    return `
        ${navView(user)}
        <h1>Admin Panel</h1>
        <button onclick="window.location.href='/admin/pending-ads'">Approve Ads</button>
        <ul>
            ${users.map(user => `
                <li>
                    ${user.username} - ${user.rights}
                    <a href="/admin/edit/${user.id}">Edit</a>
                    <a href="/admin/delete/${user.id}">Delete</a>
                </li>
            `).join('')}
        </ul>
    `;
};