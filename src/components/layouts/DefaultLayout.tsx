import { Outlet } from "react-router-dom";

import { HeaderContainer } from "@/components/layouts/header/HeaderContainer";
import { Alert } from "@/components/ui/Alert";

export function DefaultLayout() {
  return (
    <>
      <HeaderContainer />
      <main className="mx-auto text-gray-600">
        <Outlet />
        <Alert />
      </main>
    </>
  );
}
