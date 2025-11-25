/* AUTO-GENERATED - dev only */
declare global {
  interface Window { Telegram?: any; }
}

if (!window.Telegram) window.Telegram = {};

window.Telegram.WebApp = {
  initData: "query_id=AAFEXPYFAAAAAERc9gVH0-Oz&user=%7B%22id%22%3A100031556%2C%22first_name%22%3A%22Hooman%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22tahmooresi%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1764071852&hash=10d6a0603451ec1376fe3b2526674c1219b26b85563013bf2a39feafcd022e09",
  initDataUnsafe: {
  "query_id": "AAFEXPYFAAAAAERc9gVH0-Oz",
  "auth_date": "1764071852",
  "user": {
    "id": 100031556,
    "first_name": "Hooman",
    "last_name": "",
    "username": "tahmooresi",
    "language_code": "en",
    "allows_write_to_pm": true
  },
  "hash": "10d6a0603451ec1376fe3b2526674c1219b26b85563013bf2a39feafcd022e09"
},
  ready: () => console.log("[mock] Telegram WebApp ready"),
  expand: () => console.log("[mock] expand()"),
  close: () => console.log("[mock] close()"),
};

export default window.Telegram;
