class Ad {
    constructor(id, title, description, price, userId, isApproved) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.userId = userId;
        this.isApproved = isApproved;
    }
}

module.exports = Ad;