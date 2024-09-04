import qrcodeTerminal from "qrcode-terminal";
import qrCode from "qrcode-reader";
import Jimp from "jimp";
import { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";


export const renderQr = async (qr) => {
  qrcodeTerminal.generate(qr, { small: true });
};

export const qrReader = async (qrImageBuffer, maxRetries = 4, delay = 1500) => {
  return new Promise((resolve, reject) => {
    fs.writeFileSync("new-path.jpg", qrImageBuffer);
    const buffer = fs.readFileSync(
      dirname(fileURLToPath(import.meta.url)) + "/new-path.jpg"
    );
    Jimp.read(buffer)
      .then((image) => {
        let attempt = 0;

        function decodeQRCode() {
          let qrcode = new qrCode();
          qrcode.callback = function (err, value) {
            if (err) {
              attempt++;
              if (attempt <= maxRetries) {
                console.log(
                  `Attempt ${attempt} failed. Retrying in ${delay}ms...`
                );
                setTimeout(decodeQRCode, delay);
              } else {
                console.error(
                  "QR code decoding failed after multiple attempts:",
                  err
                );
                return reject("decode-error");
              }
            } else {
              return resolve(value.result);
            }
          };
          qrcode.decode(image.bitmap);
        }

        decodeQRCode();
      })
      .catch((err) => {
        console.error("Error reading the image buffer:", err);
        reject("error");
      });
  });
};
