import { SimulationContainer } from "@/components/features/stock/SimulationContainer";
import { TopPageServicePresenter } from "@/components/features/topPage/TopPageServicePresenter";

export function TopPage() {
  return (
    <>
      <TopPageServicePresenter className="h-[80vh] bg-gray-50" />
      <SimulationContainer code="0001" className="mx-auto max-w-7xl" />
    </>
  );
}
