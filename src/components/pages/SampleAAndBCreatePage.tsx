import { CreateAContainer } from "@/components/features/sampleA/CreateAContainer";
import { CreateBContainer } from "@/components/features/sampleB/CreateBContainer";

export function SampleAAndBCreatePage() {
  return (
    <>
      <div className="mb-12">
        <h3>Aを作成する</h3>
        <CreateAContainer />
      </div>
      <div>
        <h3>Bを作成する</h3>
        <CreateBContainer />
      </div>
    </>
  );
}
