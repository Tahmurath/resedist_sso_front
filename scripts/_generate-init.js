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

// Example user payload (customize as needed)
const user = {
    id: 100031556,
    first_name: "Hooman",
    last_name: "",
    username: "tahmooresi",
    language_code: "en",
    allows_write_to_pm: true,
    // photo_url اختیاریه، اگر نخوای حذف کن
};

const query_id = "AAFEXPYFAAAAAERc9gVH0-Oz"; // می‌تونی random بسازی یا ثابت بذاری
const auth_date = Math.floor(Date.now() / 1000);

// user رو به JSON تبدیل کن و URL encode کن
const userString = encodeURIComponent(JSON.stringify(user));

// data_check_string: همه فیلدها به جز hash، به ترتیب الفبایی
const dataCheckString = `auth_date=${auth_date}\nquery_id=${query_id}\nuser=${userString}`;

// hash = HMAC_SHA256(data_check_string, BOT_TOKEN) → مستقیم با توکن، نه SHA256(توکن)
const hash = crypto
    .createHmac("sha256", BOT_TOKEN)
    .update(dataCheckString)
    .digest("hex");

const finalPayload = `query_id=${query_id}&user=${userString}&auth_date=${auth_date}&hash=${hash}`;
const initData = `query_id=${query_id}&user=${userString}&auth_date=${auth_date}&hash=${hash}`;
const initDataUnsafe = {
    query_id,
    auth_date: String(auth_date),
    user: user,
    hash
};

// Write mock file
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