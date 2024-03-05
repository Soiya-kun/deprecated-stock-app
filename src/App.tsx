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
import { StockAdd } from "@/components/pages/admin/StockAdd";
import { StockSplitAdd } from "@/components/pages/admin/StockSplitAdd";
import { StockSearchPatternCreate } from "@/components/pages/myPage/StockSearchPatternCreate";
import { TodaySavedChart } from "@/components/pages/myPage/TodaySavedChart";
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
                <Route
                  path={appURL.myPageSaveSearchStockPattern}
                  element={<StockSearchPatternCreate />}
                />
                <Route element={<AuthMiddleware />}>
                  <Route path={appURL.home} element={<TopPage />} />
                  <Route path={appURL.login} element={<Login />} />
                  <Route path={appURL.error} element={<Error404 />} />
                  <Route path={appURL.myPage} element={<MyPage />} />
                  <Route
                    path={appURL.myPageSaveSearchStockPattern}
                    element={<StockSearchPatternCreate />}
                  />
                  <Route
                    path={appURL.simulation}
                    element={<SimulationPage />}
                  />
                  <Route path={appURL.todayChart} element={<TodayChart />} />
                  <Route
                    path={appURL.myPageSavedChart}
                    element={<TodaySavedChart />}
                  />
                  <Route path={appURL.adminStockAdd} element={<StockAdd />} />
                  <Route
                    path={appURL.adminStockSplitAdd}
                    element={<StockSplitAdd />}
                  />
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
