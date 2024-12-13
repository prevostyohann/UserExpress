module.exports = function (userId) {
    return `
        <h1>Create New Ad</h1>
        <form action="/ads" method="POST">
            <label>Title: <input type="text" name="title" required /></label>
            <label>Description: <textarea name="description" required></textarea></label>
            <label>Price: <input type="number" name="price" step="0.01">
            <input type="hidden" name="userId" value="${userId}" />
            <button type="submit">Create Ad</button>
        </form>
    `;
};