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
          <Tr className="font-bold">
            <Td>ロング</Td>
            <Td>ロング益</Td>
            <Td>ショート</Td>
            <Td>ショート益</Td>
            <Td>合計資産</Td>
            <Td>現金</Td>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td className="pr-8">{simulationResult.longPositionVolume} 株</Td>
            <Td className="pr-8">{simulationResult.longProfit} 円</Td>
            <Td className="pr-8">{simulationResult.shortPositionVolume} 株</Td>
            <Td className="pr-8">{simulationResult.shortProfit} 円</Td>
            <Td className="pr-8">{simulationResult.assets} 円</Td>
            <Td>{simulationResult.cashPosition} 円</Td>
          </Tr>
        </tbody>
      </Table>
    </div>
  );
}
