import { Table } from "@/components/ui/table/Table";
import { Td } from "@/components/ui/table/Td";
import { Tr } from "@/components/ui/table/Tr";
import { UnitTransaction } from "@/domains/stockTransaction/dto";

type Props = {
  className?: string;
  transactions: UnitTransaction[];
};

export function TransactionTablePresenter({ className, transactions }: Props) {
  return (
    <div className={className}>
      <Table>
        <thead>
          <Tr className="font-bold">
            <Td>日付</Td>
            <Td>価格</Td>
            <Td>株数</Td>
            <Td>合計</Td>
            <Td>メモ</Td>
          </Tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <Tr>
              <Td className="pr-8">
                {transaction.date.toISOString().slice(0, 10)}
              </Td>
              <Td className="pr-8">{transaction.unitValue} 円</Td>
              <Td className="pr-8">{transaction.volume} 株</Td>
              <Td>{transaction.unitValue * transaction.volume} 円</Td>
              <Td className="w-72 line-clamp-1">{transaction.memo}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
