const bcrypt = require("bcryptjs");

module.exports = {
  hash(pw) {
    return bcrypt.hash(pw, 10);
  },
  compare(pw, hash) {
    return bcrypt.compare(pw, hash);
  },
};
