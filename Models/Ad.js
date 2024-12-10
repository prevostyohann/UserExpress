class Ad {
    constructor(id, title, description, userId, isApproved) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.userId = userId;
        this.isApproved = isApproved;
    }
}

module.exports = Ad;