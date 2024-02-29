import cookie from "../Cookies";
console.log(cookie.get("userinfo"));
const user = cookie.get("userinfo");
const config = {
  headers: {
    Authorization: `Bearer ${user?.token}`,
  },
};

export default config;
