/* AUTO-GENERATED - dev only */
declare global {
  interface Window { Telegram?: any; }
}

if (!window.Telegram) window.Telegram = {};

window.Telegram.WebApp = {
  initData: "query_id=AAFEXPYFAAAAAERc9gVH0-Oz&user=%7B%22id%22%3A100031556%2C%22first_name%22%3A%22Hooman%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22tahmooresi%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Fg9t-hcOQ61IR6HOSUSyJYM2zUuA0IKCgJhoJSvKIXSo.svg%22%7D&auth_date=1763727291&signature=mzrAp5n3DzZFwzHX3Dm8KnETZilvNIaLj2AZ8tCp6oIB8Vl4FMvgBLf2pLsaCkf-zmN6GD-1UGqrYTw6zzHiDg&hash=c06912976e13e17dcf6e30301a5083e275fc0cd0703e2a777da9090c70af5c8a\n",
  initDataUnsafe: {
  "auth_date": "1761660489",
  "id": "123456789",
  "is_bot": "false",
  "first_name": "Dev",
  "last_name": "User",
  "username": "dev_user",
  "language_code": "en",
  "hash": "985d4283385fd4da328670f613a6354230c6e6e125885f63d02db7fc718af09d"
},
  ready: () => console.log("[mock] Telegram WebApp ready"),
  expand: () => console.log("[mock] expand()"),
  close: () => console.log("[mock] close()"),
};

export default window.Telegram;
