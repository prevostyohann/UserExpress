module.exports = function (ads, userId) {
    return `
        <h1>List of Ads</h1>
        <button onclick="window.location.href='/ads/create'">Create New Ad</button>
        <ul>
            ${ads.map(ad => `
                <li>
                    <h2>${ad.title}</h2>
                    <p>${ad.description}</p>
                    <p>Posted by User ID: ${ad.userId}</p>
                </li>
            `).join('')}
        </ul>
    `;
};