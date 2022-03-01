import { Box } from "@mui/material";
import type { NextPage } from "next";
import { useState, useEffect } from "react";

import { Loader } from "../Loader";
import { MyTable } from "../Table";
import { Layout } from "../Layout";

import { themeStyled } from "../../styles/themes/styled";
import { Languages, City, ApiResponse, Quote, Currencies } from "../../types";
import { languagesHome } from "./languages";

import { currencies } from "../../constants/currencies";

import { useMediaQuery } from "../../hooks/useMediaQuery";

import { Input } from "antd";
import { Select } from "antd";
const { Option } = Select;

import { InputGroup } from "../InputGroup";

import { getQuotes } from "../../services";

interface Props {
  language: Languages;
  data?: any;
  cities?: City[];
  defaultCity: City;
}

const Home: NextPage<Props> = ({ data, language, cities, defaultCity }) => {
  const [currencyFrom, setCurrencyFrom] = useState<Currencies>("usd");
  const [currencyTo, setCurrencyTo] = useState<Currencies>("pyg");
  const [currencyValue, setCurrencyValue] = useState<string>("1");
  const [currentCities, setCurrentCities] = useState<City[]>([defaultCity]);
  const [selectedCity, setSelectedCity] = useState<number>();
  // const [onSelectedCities, setOnSelectedCities] = useState<number[]>();

  const [dataQuota, setDataQuota] = useState<Quote[]>(data);
  const [isLoading, setIsLoading] = useState(false);

  const { isNotebook } = useMediaQuery();

  // function getCurrentCurrencyValue(PYGvalue?: number | undefined) {
  //   if (data) {
  //     const quota = data.map((quota: any) => {
  //       return {
  //         companyAndBranchOffice: `${quota.company} - ${quota.office.name}`,
  //         dollar: PYGvalue
  //           ? (PYGvalue / quota.dollar).toFixed(2)
  //           : quota.dollar,
  //         real: PYGvalue ? (PYGvalue / quota.real).toFixed(2) : quota.real,
  //       };
  //     });

  //     setDataQuota(quota);
  //   }
  // }

  // useEffect(() => {
  //   getCurrentCurrencyValue(currencyValue);
  // }, [data, currencyFrom, currencyTo, currencyValue]);

  async function handleGetQuotes() {
    setIsLoading(true);

    const data = await getQuotes(selectedCity).finally(() =>
      setIsLoading(false)
    );

    if (data && data.length) {
      setDataQuota((oldData) => {
        return [...oldData, ...data];
      });
    }
  }

  useEffect(() => {
    if (currencyFrom === currencyTo) {
      switch (currencyFrom) {
        case "usd":
          setCurrencyTo("pyg");
          break;
        case "pyg":
          setCurrencyTo("usd");
          break;
        default:
          setCurrencyTo("pyg");
      }
    }
  }, [currencyFrom]);

  useEffect(() => {
    handleGetQuotes();
  }, [selectedCity]);

  const handleChange = (values: Array<number>) => {
    const selected = cities?.filter((city) => values.includes(city.id));
    setCurrentCities(selected || []);
  };

  const onSelect = (cityId: any) => {
    setSelectedCity(cityId);
  };

  const onDeselect = (cityId: any) => {
    setDataQuota((oldData) => {
      return oldData.filter((quota) => quota.city.id !== cityId);
    });
  };

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
            paddingTop: "2rem",
          }}
        >
          ¿Dónde vale más su dólar/real hoy?
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
              <InputGroup label="Selecione a cidade">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  onChange={handleChange}
                  onSelect={onSelect}
                  onDeselect={onDeselect}
                  value={currentCities.map((city) => city.id)}
                  size="large"
                >
                  {cities?.map((city: City) => (
                    <Option key={city.id} value={city.id}>
                      {city.name}
                    </Option>
                  ))}
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
                  size="large"
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
                  size="large"
                />
              </InputGroup>

              <InputGroup label="Quero:">
                <Select
                  value={currencyTo}
                  style={{ width: "100%" }}
                  onChange={setCurrencyTo}
                  size="large"
                >
                  {currencies.map((currency) => (
                    <Option
                      key={currency.value}
                      value={currency.value}
                      disabled={currency.value === currencyFrom}
                    >
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
          <Loader loading={isLoading} />
          <MyTable
            data={dataQuota}
            currencyValue={currencyValue}
            currencyFrom={currencyFrom}
            currencyTo={currencyTo}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
