import { useParams } from "react-router-dom";

import { SimulationContainer } from "@/components/features/stock/SimulationContainer";
import { SixDotsScaleMiddle } from "@/components/ui/SixdotsScaleMiddle";

export function SimulationPage() {
  const { code } = useParams();
  if (code === undefined) return <SixDotsScaleMiddle />;
  return <SimulationContainer code={code} className="mx-auto mt-4 max-w-7xl" />;
}
