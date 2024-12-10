module.exports = function (users) {
    return `
        <h1>Admin Panel</h1>
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