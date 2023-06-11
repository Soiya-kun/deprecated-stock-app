import { ChangeEvent, useEffect, useState } from "react";

import { StockAddPresenter } from "@/components/features/adminPage/stockAddPresenter";
import { StockCreate } from "@/domains/stock/dto";
import { useCreateStock } from "@/hooks/injections";

export function StockAddContainer() {
  const [file, setFile] = useState<File | null>(null);
  const handleChangeOnInputFile = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { files } = target;
    if (files != null) {
      setFile(files[0]);
    }
  };

  const [lines, setLines] = useState<StockCreate[]>([]);
  const readCSV = () => {
    if (file === null) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const csvData = reader.result as string;
      const rows = csvData.split(/\r?\n/);
      // const headers = rows[0].split(",");
      const newLines = rows
        .slice(1)
        .filter((row) => row !== "")
        .map((row) => row.replace(/"/g, ""))
        .map((row) => row.split(","))
        .map(
          (row): StockCreate => ({
            stockCode: row[0],
            stockName: row[1],
            market: row[2],
            industry: row[3],
            bDate: "",
            bDateCreate: new Date(
              Number(row[4].substring(0, 4)),
              Number(row[4].substring(4, 6)) - 1,
              Number(row[4].substring(6, 8)),
            ),
            closedPrice: Number(row[5]),
            change: Number(row[6]),
            changePercent: Number(row[7]),
            previousClose: Number(row[8]),
            openedPrice: Number(row[9]),
            highPrice: Number(row[10]),
            lowPrice: Number(row[11]),
            volume: Number(row[12]),
            transactionPrice: Number(row[13]),
            marketCapitalization: Number(row[14]),
            highLimit: Number(row[15]),
            lowLimit: Number(row[16]),
          }),
        );
      console.log(newLines.slice(0, 10));
      setLines(newLines);
    };
    reader.readAsText(file, "SHIFT_JIS");
  };

  useEffect(() => {
    readCSV();
  }, [file]);

  const handleClickOnCreate = async () => {
    const create = useCreateStock();
    await create(lines);
    setLines([]);
  };

  return (
    <StockAddPresenter
      handleChangeOnInputFile={handleChangeOnInputFile}
      stocksCreate={lines}
      handleClickOnCreate={handleClickOnCreate}
    />
  );
}
