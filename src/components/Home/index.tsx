import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition,
} from "griddle-react";
import { Layout } from "../Layout";
import { Select } from "../Select";
import { Table } from "../Table";

import { themeStyled } from "../../styles/themes/styled";
import { languagesHome } from "./languages";

import { Languages } from "../../types";

interface Props {
  language: Languages;
}

const Home: NextPage<Props> = ({ language }) => {
  const [currencyFrom, setCurrencyFrom] = useState<"USD" | "BRL" | "PYG">(
    "USD"
  );
  const [currencyTo, setCurrencyTo] = useState<"USD" | "BRL" | "PYG">("USD");

  const { welcomeTitle, inputCurrencyFrom, inputCurrencyTo } =
    languagesHome[language];

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
      <h1 style={{ textAlign: "center" }}>{welcomeTitle}</h1>
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
          label={inputCurrencyFrom}
          currenciesData={currencies}
          setCurrency={setCurrencyFrom}
          currency={currencyFrom}
        />
        <Select
          label={inputCurrencyTo}
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
