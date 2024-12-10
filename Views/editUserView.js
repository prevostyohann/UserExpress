module.exports = function (user) {
    return `
        <h1>Edit User</h1>
        <form action="/admin/update" method="POST">
            <input type="hidden" name="id" value="${user.id}" />
            <label>Username: <input type="text" name="username" value="${user.username}" /></label>
            <label>Rights: <input type="text" name="rights" value="${user.rights}" /></label>
            <button type="submit">Update</button>
        </form>
    `;
};