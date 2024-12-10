module.exports = function (ads) {
    return `
        <h1>Pending Ads</h1>
        <ul>
            ${ads.map(ad => `
                <li>
                    <h2>${ad.title}</h2>
                    <p>${ad.description}</p>
                    <p>Posted by User ID: ${ad.userId}</p>
                    <form action="/ads/approve/${ad.id}" method="POST" style="display:inline;">
                        <button type="submit">Approve</button>
                    </form>
                    <form action="/ads/disapprove/${ad.id}" method="POST" style="display:inline;">
                        <button type="submit">Disapprove</button>
                    </form>
                </li>
            `).join('')}
        </ul>
    `;
};