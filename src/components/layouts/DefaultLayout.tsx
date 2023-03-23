import { Outlet } from "react-router-dom";

import { HeaderContainer } from "@/components/layouts/header/HeaderContainer";
import { Alert } from "@/components/ui/Alert";

export function DefaultLayout() {
  return (
    <div className="flex h-screen w-full flex-row bg-gray-50">
      <HeaderContainer />
      <main className="mx-auto w-full max-w-4xl overflow-y-auto py-20 text-gray-600">
        <Outlet />
        <Alert />
      </main>
    </div>
  );
}
