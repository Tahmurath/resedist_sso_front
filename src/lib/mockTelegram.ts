/* AUTO-GENERATED - dev only */
declare global {
  interface Window { Telegram?: any; }
}

if (!window.Telegram) window.Telegram = {};

window.Telegram.WebApp = {
  initData: "query_id=AAFEXPYFAAAAAERc9gVH0-Oz&user=%7B%22id%22%3A100031557%2C%22first_name%22%3A%22Hooman%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22tahmooresi2%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1764927947&hash=d02f89a8cb010014cce249848947b835de1a5638d66f737197ea16ea454f3328",
  initDataUnsafe: {
  "query_id": "AAFEXPYFAAAAAERc9gVH0-Oz",
  "auth_date": "1764927947",
  "user": {
    "id": 100031557,
    "first_name": "Hooman",
    "last_name": "",
    "username": "tahmooresi2",
    "language_code": "en",
    "allows_write_to_pm": true
  },
  "hash": "d02f89a8cb010014cce249848947b835de1a5638d66f737197ea16ea454f3328"
},
  ready: () => console.log("[mock] Telegram WebApp ready"),
  expand: () => console.log("[mock] expand()"),
  close: () => console.log("[mock] close()"),
};

export default window.Telegram;
