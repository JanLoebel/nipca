const fetch = require("node-fetch");
const HashUtils = require("./utils/hash_utils.js");
const ParseUtils = require("./utils/response_utils.js");
const NipcaClient = require("./nipca_client.js");

class Nipca {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.cookie = null;
    this.privateKey = null;
  }

  login(user, password) {
    return fetch(
      `${this.baseUrl}/common/authentication.cgi?act=request&username=${user}`
    )
      .then(res => res.text())
      .then(res => ParseUtils.parseResponse(res))
      .then(res => {
        // Assure everything is fine
        if (res.LoginResult.toUpperCase() !== "OK") {
          throw new Error(
            "Error while requesting inital parameters: " + JSON.stringify(res)
          );
        }
        return res;
      })
      .then(res => {
        // Store cookie
        this.cookie = `uid=${res.Cookie}; path=/`;

        // Generate private key
        this.privateKey = HashUtils.hexHmacMD5(res.PublicKey + password, res.Challenge);

        // Generate login password
        return HashUtils.hexHmacMD5(this.privateKey, res.Challenge);
      })
      .then(loginPassword =>
        this._fetchWithCookie(
          `${this.baseUrl}/common/authentication.cgi?act=login&username=${user}&loginpassword=${loginPassword}`
        )
      )
      .then(res => res.text())
      .then(res => ParseUtils.parseResponse(res))
      .then(res => {
        // Assure everything is fine
        if (res.LoginResult.toLowerCase() !== "success") {
          throw new Error("Error while login: " + JSON.stringify(res));
        }
        return res;
      })
      .then(() => {
        return new NipcaClient(this.baseUrl, this.cookie, this.privateKey);
      });
  }

  _fetchWithCookie(url) {
    const opts = { headers: { cookie: this.cookie } };
    return fetch(url, opts);
  }
}

module.exports = Nipca;
