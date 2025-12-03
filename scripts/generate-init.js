import fs from "fs";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
    console.error("Please set BOT_TOKEN in .env.local");
    process.exit(1);
}

// Example user payload
const user = {
    id: 100031557,
    first_name: "Hooman",
    last_name: "",
    username: "tahmooresi2",
    language_code: "en",
    allows_write_to_pm: true,
};

const query_id = "AAFEXPYFAAAAAERc9gVH0-Oz";
const auth_date = Math.floor(Date.now() / 1000);

// 1) نسخه‌ی raw برای محاسبه hash
const userRawString = JSON.stringify(user);

// 2) نسخه‌ی encoded برای initData
const userEncoded = encodeURIComponent(userRawString);

// 3) data_check_string بدون encode — مرتب شده الفبایی
const dataCheckString =
    `auth_date=${auth_date}
query_id=${query_id}
user=${userRawString}`;

// 4) محاسبه hash
const secret = crypto.createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
const hash = crypto
    .createHmac("sha256", secret)
    .update(dataCheckString)
    .digest("hex");

// 5) ساخت initData واقعی
const initData = `query_id=${query_id}&user=${userEncoded}&auth_date=${auth_date}&hash=${hash}`;

// 6) نسخه unsafe
const initDataUnsafe = {
    query_id,
    auth_date: String(auth_date),
    user,
    hash
};

// 7) نوشتن فایل mock
const outPath = path.resolve(process.cwd(), "src/lib/mockTelegram.ts");

const content = `/* AUTO-GENERATED - dev only */
declare global {
  interface Window { Telegram?: any; }
}

if (!window.Telegram) window.Telegram = {};

window.Telegram.WebApp = {
  initData: "${initData}",
  initDataUnsafe: ${JSON.stringify(initDataUnsafe, null, 2)},
  ready: () => console.log("[mock] Telegram WebApp ready"),
  expand: () => console.log("[mock] expand()"),
  close: () => console.log("[mock] close()"),
};

export default window.Telegram;
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, content, "utf8");

console.log("Wrote mock telegram to", outPath);
console.log("initData:", initData);
