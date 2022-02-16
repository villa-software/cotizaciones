import { Box, TextField } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import { themeStyled } from "../../styles/themes/styled";
import { Languages } from "../../types";
import { Layout } from "../Layout";
import { Select } from "../Select";
import { Table } from "../Table";
import { languagesHome } from "./languages";

interface Props {
  language: Languages;
  data: any;
}

const Home: NextPage<Props> = (props) => {
  const [currencyFrom, setCurrencyFrom] = useState<"USD" | "BRL" | "PYG">(
    "USD"
  );
  const [currencyTo, setCurrencyTo] = useState<"USD" | "BRL" | "PYG">("USD");

  const { welcomeTitle, inputCurrencyFrom, inputCurrencyTo } =
    languagesHome[props.language];

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
      <h1 style={{ textAlign: "center" }}>Onde seu dolár vale mais hoje?</h1>
      <h1 style={{ textAlign: "center" }}>Onde seu real vale mais hoje?</h1>
      <br/>
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
        data={props.data}
        columnsDefinition={[
          {
            id: "company",
            title: "Casa de câmbio",
          },
          {
            id: "dollar",
            title: "USD",
          },
          {
            id: "real",
            title: "BRL",
          },
        ]}
      />
    </Layout>
  );
};

export default Home;
