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
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
          width: "12rem",
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
      </Box>

      <TextField
        label="Valor"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
      />

      <Griddle
        data={data}
        plugins={[plugins.LocalPlugin]}
        components={{
          Layout: ({ Table }: any) => <Table />,
        }}
      >
        <RowDefinition>
          <ColumnDefinition id="currencyExchange" title="Casa de câmbio" />
          <ColumnDefinition id="buy" title="Compra" />
          <ColumnDefinition id="sell" title="Venda" />
        </RowDefinition>
      </Griddle>
    </Layout>
  );
};

export default Home;
