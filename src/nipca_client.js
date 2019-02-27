const fetch = require("node-fetch");
const buildUrl = require("build-url");
const HashUtils = require("./utils/hash_utils.js");
const ParseUtils = require("./utils/response_utils.js");

// TODOs
// /config/sdcard_download.cgi
// /config/sdcard_delete.cgi

class NipcaClient {
  constructor(baseUrl, cookie, privateKey) {
    this.baseUrl = baseUrl;
    this.cookie = cookie;
    this.privateKey = privateKey;
  }

  fetchMotion() {
    return this.fetchJson("/config/motion.cgi");
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

  fetchSystemReboot() {
    return this.fetchJson("/config/system_reboot.cgi");
  }

  fetchSystemReset() {
    return this.fetchJson("/config/system_reset.cgi");
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
  
  fetchSdCardList() {
    return this.fetchJson("/config/sdcard_list.cgi");
  }

  fetchSdCardFormat() {
    return this.fetchJson("/config/sdcard_format.cgi");
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
