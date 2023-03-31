import { Outlet } from "react-router-dom";

import { HeaderContainer } from "@/components/layouts/header/HeaderContainer";
import { Alert } from "@/components/ui/Alert";

export function DefaultLayout() {
  return (
    <div className="flex h-screen w-full flex-row bg-gray-50">
      <HeaderContainer />
      <main className="mx-auto mt-16 w-full overflow-y-auto p-4 text-gray-600">
        <Outlet />
        <Alert />
      </main>
    </div>
  );
}
