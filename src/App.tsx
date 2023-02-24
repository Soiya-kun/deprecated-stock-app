import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "@/components/functionals/AuthContextProvider";
import { AuthMiddleware } from "@/components/functionals/AuthMiddleware";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { Error404 } from "@/components/pages/Error404";
import { Login } from "@/components/pages/Login";
import { SampleAAndBCreatePage } from "@/components/pages/SampleAAndBCreatePage";
import { SampleAlertPage } from "@/components/pages/SampleAlertPage";
import { AlertProvider } from "@/components/providers/AlertProvider";
import { appURL } from "@/config/url";

function App() {
  return (
    <AlertProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            {/* 認可が必要なページはAuthMiddleware内に配置する */}
            <Route element={<AuthMiddleware />}>
              <Route element={<DefaultLayout />}>
                <Route path={appURL.home} element={<SampleAAndBCreatePage />} />
              </Route>
            </Route>
            <Route element={<DefaultLayout />}>
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
