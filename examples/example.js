const Nipca = require("../index.js");

const baseUrl = "http://192.168.0.10"; // IP of the camera
const user = "admin"; // User
const password = "753776"; // Pin-Code (backside of the camera)

new Nipca(baseUrl)
  .login(user, password)
  .then(nipcaClient => {
    nipcaClient.fetchInfo().then(res => console.log("fetchInfo:", res));
  })
  .catch(err => console.error("Error", err));
