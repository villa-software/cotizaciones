import { Table } from "antd";
import { currencyMaskToNumber } from "src/utils/currency";

type QuoteFormated = {
  key: string;
  index: number;
  city_company_office: JSX.Element;
  purchase: string;
  sale: string;
};
interface TableProps {
  data: QuoteFormated[];
  exchangeType: "purchase" | "sale";
}

const columnsConfig = (
  exchangeType: "purchase" | "sale",
  bestQuote: number
) => {
  function isBestQuoteCompany(value: string) {
    return currencyMaskToNumber(value) === bestQuote && bestQuote > 1;
  }

  function isBestQuote(value: string, type: "purchase" | "sale") {
    return isBestQuoteCompany(value) && exchangeType === type
      ? "best-quote"
      : "";
  }

  return [
    {
      title: "Casa de Câmbio",
      key: "city_company_office",
      render: (row: QuoteFormated) => (
        <span
          className={isBestQuoteCompany(row[exchangeType]) ? "best-quote" : ""}
        >
          {row.city_company_office}
        </span>
      ),
    },
    {
      title: "Compra",
      key: "purchase",
      render: (row: QuoteFormated) => {
        return (
          <span className={isBestQuote(row.purchase, "purchase")}>
            {row.purchase}
          </span>
        );
      },
    },
    {
      title: "Venda",
      key: "sale",
      render: (row: QuoteFormated) => {
        return (
          <span className={isBestQuote(row.sale, "sale")}>{row.sale}</span>
        );
      },
    },
  ];
};

export const MyTable = ({ data, exchangeType }: TableProps) => {
  const bestQuote = data.reduce((acc, quote) => {
    const quoteValue = currencyMaskToNumber(quote[exchangeType]);

    return quoteValue > acc ? quoteValue : acc;
  }, 0);

  return (
    <Table
      dataSource={data}
      columns={columnsConfig(exchangeType, bestQuote)}
      rowKey={(row) => {
        return row.key;
      }}
    />
  );
};
