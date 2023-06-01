import { Table } from "@/components/ui/table/Table";
import { Td } from "@/components/ui/table/Td";
import { Tr } from "@/components/ui/table/Tr";
import { SimulationResult } from "@/domains/stockTransaction/dto";

type Props = {
  className?: string;
  simulationResult: SimulationResult;
};

export function TransactionResultPresenter({
  className,
  simulationResult,
}: Props) {
  return (
    <div className={className}>
      <Table>
        <thead>
          <Tr className="text-sm font-bold">
            <Td>
              <p className="w-max">ロング</p>
            </Td>
            <Td>
              <p className="w-max">ロング益</p>
            </Td>
            <Td>
              <p className="w-max">ショート</p>
            </Td>
            <Td>
              <p className="w-max">ショート益</p>
            </Td>
            <Td>
              {" "}
              <p className="w-max">合計資産</p>
            </Td>
            <Td>
              <p className="w-max">現金</p>
            </Td>
          </Tr>
        </thead>
        <tbody>
          <Tr className="text-sm">
            <Td className="pr-8">
              <p className="w-max">{simulationResult.longPositionVolume} 株</p>
            </Td>
            <Td className="pr-8">
              <p className="w-max">{simulationResult.longProfit} 円</p>
            </Td>
            <Td className="pr-8">
              <p className="w-max">{simulationResult.shortPositionVolume} 株</p>
            </Td>
            <Td className="pr-8">
              <p className="w-max">{simulationResult.shortProfit} 円</p>
            </Td>
            <Td className="pr-8">
              <p className="w-max">{simulationResult.assets} 円</p>
            </Td>
            <Td>
              <p className="w-max">{simulationResult.cashPosition} 円</p>
            </Td>
          </Tr>
        </tbody>
      </Table>
    </div>
  );
}
