import { SimulationContainer } from "@/components/features/stock/SimulationContainer";
import { TopPageServicePresenter } from "@/components/features/topPage/TopPageServicePresenter";

export function TopPage() {
  return (
    <>
      <div className="flex bg-gray-50">
        <TopPageServicePresenter className="mx-auto h-[80vh] max-w-4xl" />
      </div>
      <SimulationContainer className="mx-auto max-w-6xl pt-10" />
    </>
  );
}
