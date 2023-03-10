import axios from "axios";
import Cookies from "js-cookie";

import { newToken, Token } from "@/domains/auth/dto";
import { Auth } from "@/usecases/ports/auth";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export const cookiesKey = "Token";

export const saveAuthInfoToCookie = (key: string, token: Token) => {
  Cookies.set(key, encodeURIComponent(JSON.stringify(token)));
};

export const setTokenToHeader = (token: Token) => {
  axios.defaults.headers.common.Authorization = `${token.tokenType} ${token.accessToken}`;
};

export function useAuthDriverForAxios(): Auth {
  return {
    saveTokenToCache(token: Token) {
      // authInfoをCookieに保存するついでに、apiのheaderにもtokenをセットする
      // よりクリーンに書くならheader情報も常にusecase内でadapterに渡すようにし、
      // AuthStorageの実装にaxiosを依存させる必要はないが、
      // 簡潔なのでこのようにしている
      setTokenToHeader(token);
      saveAuthInfoToCookie(cookiesKey, token);
    },
    getTokenFromCache(): Token {
      const auth = decodeURIComponent(<string>Cookies.get(cookiesKey));
      if (auth === undefined) {
        this.resetTokenInCache();
        return newToken();
      }
      try {
        return JSON.parse(auth);
      } catch (e) {
        // cookieのauth情報が不正な場合、auth情報をリセットする
        this.resetTokenInCache();
        return newToken();
      }
    },
    resetTokenInCache(): void {
      setTokenToHeader(newToken());
      Cookies.remove(cookiesKey);
    },
  };
}
