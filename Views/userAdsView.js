const navView = require('./navView');

module.exports = function (ads, user) {
    return `
        ${navView(user)}
        <h1>My Ads</h1>
        <ul>
            ${ads.map(ad => `
                <li>
                    <h2>${ad.title}</h2>
                    <p>${ad.description}</p>
                    <p>Posted by: ${ad.username}</p>
                    <form action="/ads/delete/${ad.id}" method="POST" style="display:inline;">
                        <button type="submit">Delete</button>
                    </form>
                </li>
            `).join('')}
        </ul>
    `;
};