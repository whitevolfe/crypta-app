import cookies from "next-cookies";
import { isTokenExpired } from "../context/AuthContext/AuthContext";
import { fetch } from "./dataAccess";
import jsCookie from "js-cookie";

export const SSRProps = async (page, apiName) =>
  await (page.getInitialProps = async (ctx) => {
    const { req, res } = ctx;
    const { token } = cookies(ctx);
    const isExpired = token ? isTokenExpired(token) : true;
    if (isExpired) jsCookie.remove("token");

    if (!isExpired && req?.url === "/") {
      ctx.res.writeHead(302, {
        Location: "/dashboard",
      });
      ctx.res.end();
      return;
    }

    if (apiName === "" || apiName === undefined) return {};

    try {
      const collection = await fetch(apiName, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { collection };
    } catch (error) {
      console.log(error);
      if (res) {
        res.writeHead(302, {
          Location: "/",
        });
        res.end();
      }
      return {};
    }
  });
