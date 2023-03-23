import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "@/components/functionals/AuthContextProvider";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { Error404 } from "@/components/pages/Error404";
import { Login } from "@/components/pages/Login";
import { SampleAlertPage } from "@/components/pages/SampleAlertPage";
import { TopPage } from "@/components/pages/TopPage";
import { AlertProvider } from "@/components/providers/AlertProvider";
import { appURL } from "@/config/url";

function App() {
  return (
    <AlertProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            {/* 認可が必要なページはAuthMiddleware内に配置する */}
            <Route element={<DefaultLayout />}>
              <Route path={appURL.home} element={<TopPage />} />
              <Route path={appURL.login} element={<Login />} />
              <Route path="/alert" element={<SampleAlertPage />} />
              <Route path={appURL.error} element={<Error404 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </AlertProvider>
  );
}

export default App;
