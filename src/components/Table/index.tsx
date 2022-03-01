import { Currencies, Quote } from "src/types";
import { Table } from "antd";

import { convertQuote } from "../../utils/convertQuotes";

interface ColumnProps {
  currencyFrom: Currencies;
  currencyTo: Currencies;
  currencyValue: string;
}

interface TableProps extends ColumnProps {
  data: Quote[];
}

const getColumns = ({
  currencyTo,
  currencyValue,
  currencyFrom,
}: ColumnProps) => {
  function getCurrencyValue() {
    const value = parseFloat(currencyValue);
    if (!value) return 1;

    return value <= 0 ? 1 : value;
  }

  /*  console.log({
    value: getCurrencyValue(),
    type: typeof getCurrencyValue(),
  }); */

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
            {(
              convertQuote(currencyFrom, currencyTo, row)?.purchasePrice *
              getCurrencyValue()
            ).toFixed(2)}
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
            {(
              convertQuote(currencyFrom, currencyTo, row)?.salePrice *
              getCurrencyValue()
            ).toFixed(2)}
          </span>
        );
      },
    },
  ];
};

export const MyTable = ({
  data,
  currencyValue,
  currencyTo,
  currencyFrom,
}: TableProps) => {
  return (
    <Table
      dataSource={data}
      columns={getColumns({ currencyTo, currencyFrom, currencyValue })}
      rowKey={(record) =>
        `[${record?.city?.name}] ${record?.company} - ${record?.office?.name}`
      }
    />
  );
};
