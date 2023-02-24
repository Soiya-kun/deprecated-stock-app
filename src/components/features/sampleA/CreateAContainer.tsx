import { useState } from "react";

import { CreateAPresenter } from "@/components/features/sampleA/CreateAPresenter";

export function CreateAContainer() {
  const [sampleA] = useState<string>("sampleA");
  const handleCLickOnButton = () => {};

  return (
    <CreateAPresenter
      sampleA={sampleA}
      handleCLickOnButton={handleCLickOnButton}
    />
  );
}
