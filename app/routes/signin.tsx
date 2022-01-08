import { redirect } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";

import { getSession, commitSession } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("user")) {
    return redirect("/");
  }

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("user", JSON.stringify({ id: 1, name: "Stu" }));
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

const SignIn = () => {
  return (
    <form method="post">
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
