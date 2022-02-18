import { Box } from "@mui/material";
import type { NextPage } from "next";
import { useState, useEffect } from "react";

import { Layout } from "../Layout";
import { Table } from "../Table";

import { themeStyled } from "../../styles/themes/styled";
import { Languages } from "../../types";
import { languagesHome } from "./languages";

import { useMediaQuery } from "../../hooks/useMediaQuery";

import { Input } from "antd";
import { Select } from "antd";
const { Option } = Select;

import { InputGroup } from "../InputGroup";

interface Props {
  language: Languages;
  data?: any;
}

interface Quota {
  companyAndBranchOffice: string;
  dollar: number;
  real: number;
}

const Home: NextPage<Props> = ({ data, language }) => {
  const [currencyFrom, setCurrencyFrom] = useState<"USD" | "BRL" | "PYG">(
    "USD"
  );
  const [currencyTo, setCurrencyTo] = useState<"USD" | "BRL" | "PYG">("PYG");
  const [currencyValue, setCurrencyValue] = useState<number>(1);

  const [dataQuota, setDataQuota] = useState<Quota[]>([]);

  const { welcomeTitle, inputCurrencyFrom, inputCurrencyTo } =
    languagesHome[language as keyof typeof languagesHome];

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

  function getCurrentCurrencyValue(PYGvalue?: number | undefined) {
    if (data) {
      const quota = data.map((quota: any) => {
        return {
          companyAndBranchOffice: `${quota.company} - ${quota.office.name}`,
          dollar: PYGvalue
            ? (PYGvalue / quota.dollar).toFixed(2)
            : quota.dollar,
          real: PYGvalue ? (PYGvalue / quota.real).toFixed(2) : quota.real,
        };
      });

      setDataQuota(quota);
    }
  }

  useEffect(() => {
    getCurrentCurrencyValue(currencyValue);
  }, [data, currencyFrom, currencyTo, currencyValue]);

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  console.log({ currencies });

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
              {/* <MultipleSelect /> */}
              <InputGroup label="Selecione a cidade">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  defaultValue={["a10", "c12"]}
                  //onChange={handleChange}
                >
                  {children}
                </Select>
              </InputGroup>
            </Box>

            <Box
              style={{
                display: "grid",
                gridTemplateColumns: "6rem 2fr 6rem",
                gap: "1rem",
              }}
            >
              <InputGroup label="Tenho:">
                <Select
                  value={currencyFrom}
                  style={{ width: "100%" }}
                  onChange={setCurrencyFrom}
                >
                  {currencies.map((currency) => (
                    <Option key={currency.value} value={currency.value}>
                      {currency.label}
                    </Option>
                  ))}
                </Select>
              </InputGroup>

              <InputGroup label="Valor:">
                <Input
                  value={currencyValue}
                  onChange={(e: any) => setCurrencyValue(e.target.value)}
                  placeholder="Digite o valor"
                  type="number"
                />
              </InputGroup>

              <InputGroup label="Quero:">
                <Select
                  value={currencyTo}
                  style={{ width: "100%" }}
                  onChange={setCurrencyTo}
                >
                  {currencies.map((currency) => (
                    <Option key={currency.value} value={currency.value}>
                      {currency.label}
                    </Option>
                  ))}
                </Select>
              </InputGroup>
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
            data={dataQuota}
            columnsDefinition={[
              {
                id: "companyAndBranchOffice",
                title: "Casa de câmbio",
              },
              {
                id: "purchasePrice",
                title: "Compra",
              },
              {
                id: "salePRice",
                title: "Venda",
              },
            ]}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
