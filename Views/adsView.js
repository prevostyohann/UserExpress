const navView = require('./navView');

module.exports = function (ads, user) {
    return `
        ${navView(user)}
        <h1>List of Ads</h1>
        <button onclick="window.location.href='/ads/create'">Create New Ad</button>
        <ul>
            ${ads.map(ad => `
                <li>
                    <h2>${ad.title}</h2>
                    <p>${ad.description}</p>
                    <p>Posted by: ${ad.username}</p>
                </li>
            `).join('')}
        </ul>
    `;
};