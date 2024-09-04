import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import path from "path";

export const chrome = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const broswer = await puppeteer.launch({
    userDataDir: path.resolve(__dirname, "user-data1"),
    // executablePath:
    //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--disable-dev-shm-usage",
      "--lang=en-US,en;q=0.9",
      "--disable-infobars",
      "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
      // "--proxy-server=64.64.118.149:6732",
    ],
  });

  return broswer;
};
