import { Box, TextField } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";

import { Layout } from "../Layout";
import { Select } from "../Select";
import { Table } from "../Table";
import { MultipleSelect } from "../MultipleSelect";

import { themeStyled } from "../../styles/themes/styled";
import { Languages } from "../../types";
import { languagesHome } from "./languages";

import { useMediaQuery } from "../../hooks/useMediaQuery";

interface Props {
  language: Languages;
  data?: any;
}

const Home: NextPage<Props> = (props) => {
  const [currencyFrom, setCurrencyFrom] = useState<"USD" | "BRL" | "PYG">(
    "USD"
  );
  const [currencyTo, setCurrencyTo] = useState<"USD" | "BRL" | "PYG">("USD");
  const [value, setValue] = useState();

  const { welcomeTitle, inputCurrencyFrom, inputCurrencyTo } =
    languagesHome[props.language];

  const { isNotebook } = useMediaQuery();

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
          width: "100%",
          height: "20vw",
          minHeight: "20rem",
          backgroundImage: "url(/images/background.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          marginBottom: "-3rem",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: "calc(1.5rem + 2vw)",
          }}
        >
          Onde seu dolár vale mais hoje?
        </h1>
      </Box>
      <Box
        style={{
          maxWidth: themeStyled.breakpoints.desktop,
          margin: "0 auto 2rem auto",
          display: isNotebook ? "grid" : "block",
          gridTemplateColumns: "24rem 5fr",
          gap: "1rem",
          padding: "1rem",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div>
          <Box
            style={{
              background: "#fff",
              borderRadius: ".5rem",
              padding: "1rem",
              marginBottom: isNotebook ? 0 : "1rem",
              width: "100%",
            }}
          >
            <h2>Conversor de moedas:</h2>

            <Box
              style={{
                margin: "2rem 0",
              }}
            >
              <MultipleSelect />
            </Box>

            <Box
              style={{
                display: "grid",
                gridTemplateColumns: "5rem 1fr 5rem",
                gap: "1rem",
              }}
            >
              <Select
                label={inputCurrencyFrom}
                currenciesData={currencies}
                setCurrency={setCurrencyFrom}
                currency={currencyFrom}
              />
              <TextField
                label="Valor"
                id="outlined-start-adornment"
                fullWidth
                placeholder="Digite o valor"
                InputLabelProps={{ shrink: true }}
              />
              <Select
                label={inputCurrencyTo}
                currenciesData={currencies}
                setCurrency={setCurrencyTo}
                currency={currencyTo}
              />
            </Box>
          </Box>
        </div>

        <Box
          style={{
            background: "#fff",
            borderRadius: ".5rem",
            padding: "1rem",
            width: "100%",
          }}
        >
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
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
