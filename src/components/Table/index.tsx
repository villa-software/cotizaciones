import { Currencies, Quote } from "src/types";
import { Table } from "antd";

import { convertQuote } from "../../utils/convertQuotes";

interface ColumnProps {
  currencyFrom: Currencies;
  currencyTo: Currencies;
}

interface TableProps extends ColumnProps {
  data: Quote[];
}

const getColumns = ({ currencyTo, currencyFrom }: ColumnProps) => {
  return [
    {
      title: "Casa de Câmbio",
      key: "name",
      render: (row: Quote) => {
        return (
          <span>
            <b>{row?.city?.name}</b> {row?.company} - {row?.office?.name}
          </span>
        );
      },
    },
    {
      title: "Compra",
      key: "age",
      render: (row: Quote) => {
        return (
          <span>
            {convertQuote(currencyFrom, currencyTo, row)?.purchasePrice.toFixed(
              2
            )}
          </span>
        );
      },
    },
    {
      title: "Venda",
      key: "address",
      render: (row: Quote) => {
        return (
          <span>
            {convertQuote(currencyFrom, currencyTo, row)?.salePrice.toFixed(2)}
          </span>
        );
      },
    },
  ];
};

export const MyTable = ({ data, currencyTo, currencyFrom }: TableProps) => {
  return (
    <Table
      dataSource={data}
      columns={getColumns({ currencyTo, currencyFrom })}
      rowKey={(record) =>
        `[${record?.city?.name}] ${record?.company} - ${record?.office?.name}`
      }
    />
  );
};
