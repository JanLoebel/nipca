# Network IP Camera Application Programming Interface (NIPCA) - Client
A `node.js` client to connect to NIPCA, which is a protocol for some Network IP Cameras e.g.: `DLINK DCS-8200LH`.

[![npm version](https://badge.fury.io/js/nipca.svg)](https://badge.fury.io/js/nipca)

## Description
Provides a `node.js` client to access NIPCA based IP Cameras. Tested with `node.js 10` and `DLINK DCS-8200LH`.

Some of the cameras seems to support `Basic Authentication` by suppling the credentials by `base64(username:password)`. In my case (with the `DLINK DCS-8200LH`) this wasn't working, therefore I had to reverse engineer the authentication protocol there.

## Install
```bash
npm install nipca --save
```

## Usage
This is a code example to show how to use this library.

```javascript
const Nipca = require("nipca");

const baseUrl = "http://192.168.0.10"; // IP of the camera
const user = "admin"; // User
const password = "753776"; // Pin-Code (backside of the camera)

new Nipca(baseUrl)
  .login(user, password)
  .then(nipcaClient => {
    nipcaClient.fetchInfo().then(res => console.log("fetchInfo:", res));
  })
  .catch(err => console.error("Error", err));
```

## Further Links
- http://gurau-audibert.hd.free.fr/josdblog/wp-content/uploads/2013/09/CGI_2121.pdf
- https://docplayer.net/33354138-Network-ip-camera-application-programming-interface-nipca.html
- ftp://ftp.dlink.net.pl/dcs/dcs-2132L/documentation/DCS-2132L_NIPCA_support%20table_1-9-5_20131211.pdf

