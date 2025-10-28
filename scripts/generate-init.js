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
    id: 123456789,
    is_bot: false,
    first_name: "Dev",
    last_name: "User",
    username: "dev_user",
    language_code: "en",
};

// auth_date in seconds
const auth_date = Math.floor(Date.now() / 1000);

// Flatten fields as Telegram expects
const fields = {
    auth_date: String(auth_date),
    id: String(user.id),
    is_bot: String(user.is_bot),
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    language_code: user.language_code,
};

// Build data_check_string: sorted by key, key=value lines joined by \n
const sortedKeys = Object.keys(fields).sort();
const dataCheckString = sortedKeys.map(k => `${k}=${fields[k]}`).join("\n");

// secret_key = SHA256(bot_token)
const secretKey = crypto.createHash("sha256").update(BOT_TOKEN).digest();

// hash = HMAC_SHA256(data_check_string, secret_key) in hex
const hmac = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

// Build initData (URLSearchParams)
const params = new URLSearchParams();
for (const k of sortedKeys) {
    params.append(k, fields[k]);
}
params.append("hash", hmac);
const initData = params.toString();

// Write mock file
const outPath = path.resolve(process.cwd(), "src/lib/mockTelegram.ts");
const content = `/* AUTO-GENERATED - dev only */
declare global {
  interface Window { Telegram?: any; }
}

if (!window.Telegram) window.Telegram = {};

window.Telegram.WebApp = {
  initData: ${JSON.stringify(initData)},
  initDataUnsafe: ${JSON.stringify({ ...fields, hash: hmac }, null, 2)},
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