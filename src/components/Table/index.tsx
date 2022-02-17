import type { NextPage } from "next";
import { useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition,
} from "griddle-react";
import { Layout } from "../Layout";
import { Select } from "../Select";

import { themeStyled } from "../../styles/themes/styled";

type ColumnDefinitionType = {
  id: string;
  title: string;
};

interface Props {
  data: any;
  columnsDefinition: ColumnDefinitionType[];
}

export const Table = ({ data, columnsDefinition }: Props) => {
  return (
    <Griddle
      data={data}
      plugins={[plugins.LocalPlugin]}
      styleConfig={{
        styles: {
          Table: {
            width: "100%",
            textAlign: "left",
            borderSpacing: "0",
          },
          TableHeadingCell: {
            padding: ".5rem",
            borderBottom: "solid 1px #ddd",
          },
          Cell: {
            padding: ".5rem",
            borderBottom: "solid 1px #ddd",
            borderSpacing: "0",
          },
        },
      }}
      textProperties={{
        filterPlaceholder: "Buscar por matriz",
      }}
      components={{
        Layout: ({ Table, Filter, Pagination }: any) => (
          <Box
            style={{
              width: "100%",
              margin: "auto",
            }}
          >
            <Box
              style={{
                marginBottom: "1rem",
              }}
            >
              <Filter />
            </Box>
            <Table />
            <Box
              style={{
                marginTop: "1rem",
                textAlign: "right",
              }}
            >
              <Pagination />
            </Box>
          </Box>
        ),
      }}
    >
      <RowDefinition>
        {columnsDefinition.map((definition) => (
          <ColumnDefinition
            key={definition.id}
            id={definition.id}
            title={definition.title}
          />
        ))}
      </RowDefinition>
    </Griddle>
  );
};
