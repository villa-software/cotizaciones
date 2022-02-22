import { Quote } from "src/types";
import { Table } from "antd";
interface Props {
  data: Quote[];
}

const columns = [
  {
    title: "Casa de Câmbio",
    key: "name",
    render: (row: Quote) => {
      return <span>{row?.office?.name}</span>;
    },
  },
  {
    title: "Compra",
    key: "age",
    render: (row: Quote) => {
      return <span>{row?.usd?.purchasePrice}</span>;
    },
  },
  {
    title: "Venda",
    key: "address",
    render: (row: Quote) => {
      return <span>{row?.usd?.purchasePrice}</span>;
    },
  },
];

export const MyTable = ({ data }: Props) => {
  return <Table dataSource={data} columns={columns} />;
};
