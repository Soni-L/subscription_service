const bcrypt = require("bcryptjs");

module.exports = class PasswordHasher {
    constructor() {
        this.rounds = 10;
    }

    async hash(password) {
        return await bcrypt.hash(password, this.rounds);
    }

    async check(password) {
        return await bcrypt.compare(password, hash);
    }
}