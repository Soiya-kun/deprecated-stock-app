import { useState } from "react";

import { CreateBPresenter } from "@/components/features/sampleB/CreateBPresenter";

export function CreateBContainer() {
  const [sampleB] = useState<string>("sampleB");
  const handleCLickOnButton = () => {};

  return (
    <CreateBPresenter
      sampleB={sampleB}
      handleCLickOnButton={handleCLickOnButton}
    />
  );
}
