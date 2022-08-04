import { Currencies, Quote } from "src/types";
import { Table } from "antd";

import { convertQuote } from "../../utils/convertQuotes";

interface ColumnProps {
  currencyFrom: Currencies;
  currencyTo: Currencies;
  currencyValue: string;
  purchaseOrSale: "purchase" | "sale";
}

interface TableProps extends ColumnProps {
  data: Quote[];
}

const getColumns = ({
  currencyTo,
  currencyValue,
  currencyFrom,
  purchaseOrSale,
}: ColumnProps) => {
  function getCurrencyValue() {
    let currencyValueFormated = "";

    const [number, cents] = currencyValue.split(",");

    const numberOnlyNumbers = number.split(".");
    numberOnlyNumbers.forEach((value) => (currencyValueFormated += value));

    currencyValueFormated += cents ? `.${cents}` : "";

    const value = parseFloat(currencyValueFormated);
    if (!value) return 1;

    return value <= 0 ? 1 : value;
  }

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
          <span className={purchaseOrSale === "purchase" ? "best-quote" : ""}>
            {new Intl.NumberFormat("de-DE").format(
              convertQuote(currencyFrom, currencyTo, row)?.purchasePrice *
                getCurrencyValue()
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
          <span className={purchaseOrSale === "sale" ? "best-quote" : ""}>
            {new Intl.NumberFormat("de-DE").format(
              convertQuote(currencyFrom, currencyTo, row)?.salePrice *
                getCurrencyValue()
            )}
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
  purchaseOrSale,
}: TableProps) => {
  return (
    <Table
      dataSource={data}
      columns={getColumns({
        currencyTo,
        currencyFrom,
        currencyValue,
        purchaseOrSale,
      })}
      rowKey={(record, index) => {
        console.log({ record });
        return `[${record?.city?.name}] ${record?.company} - ${record?.office?.name}`;
      }}
    />
  );
};
