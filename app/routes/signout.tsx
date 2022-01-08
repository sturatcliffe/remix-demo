import { redirect } from "remix";
import type { LoaderFunction } from "remix";

import { getSession, destroySession } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/signin", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
