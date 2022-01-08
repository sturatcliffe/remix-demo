import { createCookieSessionStorage } from "remix";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",

      expires: new Date(Date.now() + 10),
      httpOnly: true,
      maxAge: 10,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
