import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "@/components/functionals/AuthContextProvider";
import { AuthMiddleware } from "@/components/functionals/AuthMiddleware";
import { BreakPointContextProvider } from "@/components/functionals/BreakPointContextProvider";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { Error404 } from "@/components/pages/Error404";
import { Login } from "@/components/pages/Login";
import { MyPage } from "@/components/pages/MyPage";
import { SimulationPage } from "@/components/pages/SimulationPage";
import { TodayChart } from "@/components/pages/TodayChart";
import { TopPage } from "@/components/pages/TopPage";
import { AlertProvider } from "@/components/providers/AlertProvider";
import { appURL } from "@/config/url";

function App() {
  return (
    <AlertProvider>
      <BreakPointContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              {/* 認可が必要なページはAuthMiddleware内に配置する */}
              <Route element={<DefaultLayout />}>
                <Route path={appURL.home} element={<TopPage />} />
                <Route path={appURL.login} element={<Login />} />
                <Route path={appURL.error} element={<Error404 />} />
                <Route element={<AuthMiddleware />}>
                  <Route path={appURL.myPage} element={<MyPage />} />
                  <Route
                    path={appURL.simulation}
                    element={<SimulationPage />}
                  />
                  <Route path={appURL.todayChart} element={<TodayChart />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </BreakPointContextProvider>
    </AlertProvider>
  );
}

export default App;
