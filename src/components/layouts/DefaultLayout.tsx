import { Outlet } from "react-router-dom";

import { HeaderContainer } from "@/components/layouts/header/HeaderContainer";
import { Alert } from "@/components/ui/Alert";

export function DefaultLayout() {
  return (
    <div className="flex h-screen w-full flex-row bg-gray-50">
      <HeaderContainer />
      <main className="mx-auto mt-20 w-full overflow-y-auto text-gray-600">
        <Outlet />
        <Alert />
      </main>
    </div>
  );
}
