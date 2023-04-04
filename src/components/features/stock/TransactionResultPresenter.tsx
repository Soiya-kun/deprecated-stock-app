import { Table } from "@/components/ui/table/Table";
import { Td } from "@/components/ui/table/Td";
import { Tr } from "@/components/ui/table/Tr";
import { transactionResult } from "@/domains/stockTransaction/computed";
import { Simulation } from "@/domains/stockTransaction/dto";

type Props = {
  className?: string;
  currentValue: number;
  simulation: Simulation;
};

export function TransactionResultPresenter({
  className,
  currentValue,
  simulation,
}: Props) {
  const result = transactionResult(simulation, currentValue);
  return (
    <div className={className}>
      <Table>
        <thead>
          <Tr className="font-bold">
            <Td>ロング</Td>
            <Td>ショート</Td>
            <Td>合計資産</Td>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td className="pr-8">{result.longPosition} 株</Td>
            <Td className="pr-8">{result.shortPosition} 株</Td>
            <Td className="pr-8">{result.profit} 円</Td>
          </Tr>
        </tbody>
      </Table>
    </div>
  );
}
