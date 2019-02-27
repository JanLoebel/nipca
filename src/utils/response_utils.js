function parseResponse(response) {
  const result = {};
  response.split("\n").forEach(line => {
    const lineInformation = cleanLine(line).split("=");
    const key = lineInformation[0];
    const value = lineInformation[1];
    if (key) {
      result[key] = value;
    }
  });
  return result;
}

function cleanLine(line) {
  return line.replace("\r", "");
}

module.exports = {
  parseResponse
};
