import type { NextPage } from "next";
import { useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition,
} from "griddle-react";
import { Layout } from "../components/Layout";
import { Select } from "../components/Select";
import { Table } from "../components/Table";

import { themeStyled } from "../styles/themes/styled";

const Home: NextPage = () => {
  const [currencyFrom, setCurrencyFrom] = useState<"USD" | "BRL" | "PYG">(
    "USD"
  );
  const [currencyTo, setCurrencyTo] = useState<"USD" | "BRL" | "PYG">("USD");

  var data = [
    {
      currencyExchange: "Santa Rita Câmbios",
      buy: 6980,
      sell: 6580,
    },
    {
      currencyExchange: "Câmbios Chaco",
      buy: 6980,
      sell: 6580,
    },
    {
      currencyExchange: "Santa Rita Câmbios",
      buy: 6980,
      sell: 6580,
    },
    {
      currencyExchange: "Câmbios Chaco",
      buy: 6980,
      sell: 6580,
    },
    {
      currencyExchange: "Santa Rita Câmbios",
      buy: 6980,
      sell: 6580,
    },
    {
      currencyExchange: "Câmbios Chaco",
      buy: 6980,
      sell: 6580,
    },
    {
      currencyExchange: "Santa Rita Câmbios",
      buy: 6980,
      sell: 6580,
    },
  ];

  const currencies = [
    {
      value: "USD",
      label: "USD",
    },
    {
      value: "BRL",
      label: "BRL",
    },
    {
      value: "PYG",
      label: "PYG",
    },
  ];

  return (
    <Layout title="Create Next App">
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 2fr",
          gap: "1rem",
          maxWidth: themeStyled.breakpoints.tablet,
          margin: "0 auto 2rem auto",
        }}
      >
        <Select
          label="Tenho"
          currenciesData={currencies}
          setCurrency={setCurrencyFrom}
          currency={currencyFrom}
        />
        <Select
          label="Quero"
          currenciesData={currencies}
          setCurrency={setCurrencyTo}
          currency={currencyTo}
        />
        <TextField label="Valor" id="outlined-start-adornment" fullWidth />
      </Box>

      <Table
        data={data}
        columnsDefinition={[
          {
            id: "currencyExchange",
            title: "Casa de câmbio",
          },
          {
            id: "buy",
            title: "Compra",
          },
          {
            id: "sell",
            title: "Venda",
          },
        ]}
      />
    </Layout>
  );
};

export default Home;
