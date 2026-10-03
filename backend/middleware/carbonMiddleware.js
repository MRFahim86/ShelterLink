import { co2 } from "@tgwf/co2";

// Initialize CO2.js with the Sustainable Web Design model
const co2Emission = new co2({
  model: "swd"
});

// Middleware to calculate data transfer
const carbonMiddleware = (req, res, next) => {
  let requestBytes = 0;
  let responseBytes = 0;

  // Calculate request size
  if (req.body) {
    requestBytes += Buffer.byteLength(
      JSON.stringify(req.body),
      "utf8"
    );
  }

  if (req.query) {
    requestBytes += Buffer.byteLength(
      JSON.stringify(req.query),
      "utf8"
    );
  }

  if (req.headers) {
    requestBytes += Buffer.byteLength(
      JSON.stringify(req.headers),
      "utf8"
    );
  }

  // Override res.write to calculate response size
  const originalWrite = res.write;
  const originalEnd = res.end;

  res.write = function (chunk) {
    if (chunk) {
      responseBytes += Buffer.byteLength(chunk, "utf8");
    }

    originalWrite.apply(res, arguments);
  };

  // Override res.end to calculate final response size
  res.end = function (chunk) {
    if (chunk) {
      responseBytes += Buffer.byteLength(chunk, "utf8");
    }

    // Total transferred data
    const totalBytes = requestBytes + responseBytes;

    // Set to true if the server is hosted on a green host
    const greenHost = false;

    // Calculate estimated CO2 emissions
    const emissions = co2Emission.perByte(
      totalBytes,
      greenHost
    );

    console.log(
      `Data transferred: ${totalBytes} bytes`
    );

    console.log(
      `Estimated CO2 emissions: ${emissions.toFixed(3)} grams`
    );

    originalEnd.apply(res, arguments);
  };

  next();
};

export default carbonMiddleware;