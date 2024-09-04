// import from package
import { fileURLToPath } from "url";

// import localy
import { renderQr, qrReader } from "./qr.js";
import { sleep, notify, getRandomTikTokComment } from "./utils.js";
import { chrome } from "./browser.js";

// function

const isRobotCheckPopupOpne = async (page) => {
  const isFound = await page.$("#tiktok-verify-ele");
  if (isFound) {
    for (let i = 0; i < 1000; i++) {
      await sleep(5);
      notify();
      const isFound = await page.$("#tiktok-verify-ele");
      if (!isFound) return false;
    }
  }
  return false;
};

// main function
(async function () {
  const browser = await chrome();
  const page = await browser.newPage();

  //  await page.authenticate({
  //    username: "dquxnvhk",
  //    password: "gxb7uq9tpqk9",
  //  });

  await page.goto("https://tiktok.com");
  await page.setViewport({ width: 1366, height: 768 });

  await isRobotCheckPopupOpne(page);

  await sleep(20);

  let isLoggedIn = true;

  try {
    await page.waitForSelector("#header-login-button", { timeout: 15 * 1000 });
    await page.locator("#header-login-button").click();
    isLoggedIn = false;
    await page
      .locator(
        "#loginContainer > div > div > div > div:nth-child(1) > div > div"
      )
      .click();
    await sleep(8);

    for (let i = 0; i < 10; i++) {
      await page.waitForSelector('[data-e2e="qr-code"] canvas', {
        timeout: 5 * 1000,
      });
      const qrCanvas = await page.$('[data-e2e="qr-code"] canvas');
      const qrImageBuffer = await qrCanvas.screenshot();
      const qrUrl = await qrReader(qrImageBuffer);
      console.log(qrUrl);
      await renderQr(qrUrl);
      for (let x = 0; i < 58; x++) {
        await sleep(1);
        const url = page.url();
        if (url.includes("https://www.tiktok.com/foryou")) {
          isLoggedIn = true;
          return;
        }
      }
    }
  } catch (error) {
    // console.log(error);
    console.log("Contine");
  }

  //   check logging
  if (isLoggedIn) {
    console.log("you are logged In ");
    await sleep(10);
  } else {
    return;
  }

  await page.waitForSelector('[data-e2e="comment-icon"]', {
    timeout: 20 * 1000,
  });
  await page.locator('[data-e2e="comment-icon"]').click();

  await isRobotCheckPopupOpne(page);

  for (let z = 0; z < 100; z++) {
    try {
      // click on arrow
      await page.waitForSelector('[data-e2e="arrow-right"]');
      await page.locator('[data-e2e="arrow-right"]').click();
      const randomwaitSecond = Math.floor(Math.random() * (20 - 7 + 1)) + 7;
      await sleep(randomwaitSecond);

      await page.waitForSelector('[data-e2e="browse-like-icon"]');
      await page.locator('[data-e2e="browse-like-icon"]').click();
      console.log("[ liked ] : ",z, page.url());
      await sleep(5);

      await page.waitForSelector('[data-e2e="comment-emoji-icon"]');
      await page.locator('[data-e2e="comment-emoji-icon"]').click();

      await page.waitForSelector('li[data-index="3"]');
      await page.locator('li[data-index="3"]').click();

      // comment  start here
      const randomNum = Math.floor(Math.random() * 3) + 1;
      if (randomNum == 3) {
        const comment = getRandomTikTokComment();
        await page.evaluate((comment) => {
          document.execCommand("delete");
          document.execCommand("insertText", false, comment);
        }, comment);
        await page.waitForSelector('[data-e2e="comment-post"]');
        await page.locator('[data-e2e="comment-post"]').click();
        console.log("commented : ", comment, page.url());
      }
      // comment end here

      await sleep(8);

      await isRobotCheckPopupOpne(page);
    } catch (error) {
      notify("Error while running Acitivity Loop");
      await isRobotCheckPopupOpne(page);
    }
  }
})();
