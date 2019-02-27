const crypto = require("crypto");

function hexHmacMD5(key, data) {
  return crypto
    .createHmac("md5", key)
    .update(data)
    .digest("hex")
    .toUpperCase();
}

module.exports = {
  hexHmacMD5
};
