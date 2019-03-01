const fetch = require("node-fetch");
const buildUrl = require("build-url");
const HashUtils = require("./utils/hash_utils.js");
const ParseUtils = require("./utils/response_utils.js");

class NipcaClient {
  constructor(baseUrl, cookie, privateKey) {
    this.baseUrl = baseUrl;
    this.cookie = cookie;
    this.privateKey = privateKey;
  }

  fetchMotion() {
    return this.fetchJson("/config/motion.cgi");
  }

  updateMotion(params = { enable: "yes", sensitivity: 50, mbmask: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF" }) {
    return this.fetchJson("/config/motion.cgi", params);
  }

  fetchNotifyStream() {
    return this.fetchJson("/config/notify_stream.cgi");
  }

  fetchNotify() {
    return this.fetchJson("/config/notify.cgi");
  }

  fetchWireless() {
    return this.fetchJson("/config/wireless.cgi");
  }
  
  fetchStreamInfo() {
    return this.fetchJson("/config/stream_info.cgi");
  }
  
  fetchWirelessSurvey() {
    return this.fetchJson("/config/wlansurvey.cgi");
  }

  fetchCameraInfo() {
    return this.fetchJson("/config/camera_info.cgi");
  }

  fetchMic() {
    return this.fetchJson("/config/mic.cgi");
  }
  
  fetchInfo() {
    return this.fetchJson("/common/info.cgi");
  }

  fetchDateTime() {
    return this.fetchJson("/config/datetime.cgi");
  }

  fetchSensorInfo() {
    return this.fetchJson("/config/sensor_info.cgi");
  }

  fetchSensor() {
    return this.fetchJson("/config/sensor.cgi");
  }

  fetchAudio() {
    return this.fetchJson("/config/audio.cgi");
  }
  
  fetchNetwork() {
    return this.fetchJson("/config/network.cgi");
  }

  fetchPPPOE() {
    return this.fetchJson("/config/pppoe.cgi");
  }

  fetchDDNS() {
    return this.fetchJson("/config/ddns.cgi");
  }

  fetchUPNP() {
    return this.fetchJson("/config/upnp.cgi");
  }

  fetchLed() {
    return this.fetchJson("/config/led.cgi");
  }

  fetchRTSPUrl() {
    return this.fetchJson("/config/rtspurl.cgi");
  }

  fetchSensorOutput() {
    return this.fetchJson("/config/sensor_output.cgi");
  }

  fetchIrLed() {
    return this.fetchJson("/config/irled.cgi");
  }

  fetchIcr() {
    return this.fetchJson("/config/icr.cgi");
  }
  
  fetchStreamAuth() {
    return this.fetchJson("/config/stream_auth.cgi");
  }
  
  fetchSdCard() {
    return this.fetchJson("/config/sdcard.cgi");
  }
  
  fetchSdCardList(params = { type: "video", path: "/", page: 1, pagesize: 20}) {
    return this.fetchJson("/config/sdcard_list.cgi", params);
  }

  fetchSdCardDownload(params = { type: "video", path: "/", file: "video.avi"}) {
    return this.fetchBinary("/config/sdcard_download.cgi", params);
  }

  fetchSdCardDelete(params = { type: "video", path: "/", name: "video.avi"}) {
    return this.fetchJson("/config/sdcard_delete.cgi", params);
  }

  doSystemReboot() {
    return this.fetchJson("/config/system_reboot.cgi", { reboot: "go" });
  }

  doSystemReset() {
    return this.fetchJson("/config/system_reset.cgi", { reset: "go" });
  }

  doSdCardFormat() {
    return this.fetchJson("/config/sdcard_format.cgi", { format: "go" });
  }

  fetchJpegImage() {
    return this.fetchBinary("/image/jpeg.cgi");
  }

  fetchBinary(endpoint, queryParams={}) {
    return this.fetch(endpoint, queryParams)
      .then(res => res.buffer());
  }

  fetchJson(endpoint, queryParams={}) {
    return this.fetch(endpoint, queryParams)
      .then(res => res.text())
      .then(res => ParseUtils.parseResponse(res));
  }

  fetch(endpoint, queryParams = {}) {
    const opts = { headers: { cookie: this.cookie } };
    const timestamp = new Date().getTime();
    const hash = HashUtils.hexHmacMD5(this.privateKey, timestamp + endpoint);

    const url = buildUrl(this.baseUrl, {
      path: endpoint,
      queryParams: {
        ...queryParams,
        sid: hash,
        ts: timestamp
      }
    });
    return fetch(url, opts);
  }
}

module.exports = NipcaClient;
