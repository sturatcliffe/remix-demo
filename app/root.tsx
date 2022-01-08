import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  redirect,
} from "remix";
import type { MetaFunction, LoaderFunction, ShouldReloadFunction } from "remix";

import { getSession } from "./utils/session.server";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

type User = {
  id: number;
  name: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  console.log("ROOT LOADER FIRING");

  const session = await getSession(request.headers.get("Cookie"));

  const user = session.get("user") ?? undefined;

  if (
    !user &&
    !["/signin", "/signout"].includes(new URL(request.url).pathname)
  ) {
    return redirect("/signin");
  }

  return {
    user: user ? (JSON.parse(user) as User) : undefined,
  };
};

export const unstable_shouldReload: ShouldReloadFunction = () => true;

export default function App() {
  const { user } = useLoaderData<{ user: User | undefined }>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body style={{ padding: 0, margin: 0 }}>
        {user && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "teal",
              color: "white",
              padding: "0 25px",
            }}
          >
            <h1>Welcome, {user.name}</h1>
            <nav style={{ display: "flex" }}>
              <Link to="/" style={{ color: "white", marginLeft: "10px" }}>
                Home
              </Link>
              <Link
                to="/profile"
                style={{ color: "white", marginLeft: "10px" }}
              >
                Profile
              </Link>
              <Link
                to="/signout"
                style={{ color: "white", marginLeft: "10px" }}
              >
                Sign Out
              </Link>
            </nav>
          </div>
        )}
        <div style={{ padding: "0 25px" }}>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
