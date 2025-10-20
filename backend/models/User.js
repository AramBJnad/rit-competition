class User {
    constructor(username) {
        this.username = username;
        this.role = username.toLowerCase() === 'admin' ? 'U-fund Manager' : 'Helper';
    }
}

module.exports = User;
