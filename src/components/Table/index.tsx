import { Table } from "antd";

type QuoteFormated = {
  key: string;
  index: number;
  city_company_office: JSX.Element;
  purchase: string;
  sale: string;
};
interface TableProps {
  data: QuoteFormated[];
}

const columnsConfig = [
  {
    title: "Casa de Câmbio",
    key: "city_company_office",
    render: (row: QuoteFormated) => row.city_company_office,
  },
  {
    title: "Compra",
    key: "purchase",
    render: (row: QuoteFormated) => {
      return <span>{row.purchase}</span>;
    },
  },
  {
    title: "Venda",
    key: "sale",
    render: (row: QuoteFormated) => {
      return <span>{row.sale}</span>;
    },
  },
];

export const MyTable = ({ data }: TableProps) => {
  return (
    <Table
      dataSource={data}
      columns={columnsConfig}
      rowKey={(row) => {
        return row.key;
      }}
    />
  );
};
