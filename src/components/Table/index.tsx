import { useMemo } from "react";
import { Quote } from "src/types";
import styled from "styled-components";
import { Table } from 'antd';

type ColumnDefinitionType = {
  id: string;
  title: string;
};

interface Props {
  data: Quote[];
}

const TableWrap = styled.div`
    max-width: 100%;
    width: 100%;
`;

const TableWithStyle = styled.table`
    width: 100%;
`;

export const MyTable = ({ data }: Props) => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Casa de Câmbio',
      key: 'name',
      render: (row: Quote) => {
        return (<span>{row.office.name}</span>)
      }
    },
    {
      title: 'Compra',
      key: 'age',
      render: (row: Quote) => {
        return (<span>{row.usd.purchasePrice}</span>)
      }
    },
    {
      title: 'Venda',
      key: 'address',
      render: (row: Quote) => {
        return (<span>{row.usd.purchasePrice}</span>)
      }
    },
  ];
  
  return <Table dataSource={data} columns={columns} />;
};
