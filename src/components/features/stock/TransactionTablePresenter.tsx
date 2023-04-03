import { Table } from "@/components/ui/table/Table";
import { Td } from "@/components/ui/table/Td";
import { Tr } from "@/components/ui/table/Tr";
import { UnitTransaction } from "@/domains/stockTransaction/dto";

type Props = {
  transactions: UnitTransaction[];
};

export function TransactionTablePresenter({ transactions }: Props) {
  return (
    <Table>
      <thead>
        <Tr>
          <Td>日付</Td>
          <Td>価格</Td>
          <Td>株数</Td>
          <Td>合計</Td>
        </Tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <Tr>
            <td>{transaction.date.toISOString().slice(0, 10)}</td>
            <td>{transaction.unitValue}</td>
            <td>{transaction.volume}</td>
            <td>{transaction.unitValue * transaction.volume}</td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
