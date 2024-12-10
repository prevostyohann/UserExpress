module.exports = function () {
    return `
        <h1>Create New Ad</h1>
        <form action="/ads" method="POST">
            <label>Title: <input type="text" name="title" required /></label>
            <label>Description: <textarea name="description" required></textarea></label>
            <input type="hidden" name="userId" value="/* User ID here */" />
            <button type="submit">Create Ad</button>
        </form>
    `;
};