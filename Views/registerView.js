const navView = require('./navView');

function registerView(user) {
    return `
     ${navView(user)}
        <html>
            <head>
                <title>Register</title>
            </head>
            <body>
            <h1>Register</h1>
                <form action="/register" method="post">
                    <label for="username">Username:</label><br><br>
                    <input type="username" id="username" name="username" placeholder="Username" required><br><br>
                    <label for="password">Password:</label><br><br>
                    <input type="password" id="password" name="password" placeholder="Password" required><br><br>
                    <button type="submit">Send</button>
                </form>
            </body>
        </html>
    `;
}

module.exports = registerView;