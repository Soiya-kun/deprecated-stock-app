import { Link } from "react-router-dom";

import { appURL } from "@/config/url";

export function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Link to={appURL.home}>home</Link>
    </div>
  );
}
