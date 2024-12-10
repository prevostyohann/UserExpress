function loginView() {
    return `
        <html>
            <head>
                <title>Login</title>
            </head>
            <body>
            <h1>Login</h1>
                <form action="/login" method="post">
                    <label for="username">Username:</label><br><br>
                    <input type="username" id="username" name="username" placeholder="Username" required><br><br>
                    <label for="password">Mot de Passe:</label><br><br>
                    <input type="password" id="password" name="password" placeholder="Mot de Passe" required><br><br>
                    <button type="submit">Login</button>
                </form>
                    <a href="./register" id="register">Register</a>
            </body>
        </html>
    `;
}

module.exports = loginView;