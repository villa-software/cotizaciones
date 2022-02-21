import { useState, ChangeEvent, useEffect } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

import { themeStyled } from "../../styles/themes/styled";
import { useMediaQuery } from "../../hooks/useMediaQuery";

//import Logo from "/logos/ideia-logo-02.svg";

import { Languages } from "../../types";

interface Props {
  hasScrolled: boolean;
}

export const Topbar = ({ hasScrolled }: Props) => {
  const [currentLanguage, setCurrentLanguage] = useState<Languages>("es");
  const { route, push: redirectTo } = useRouter();

  const languages: { value: Languages; label: "PT" | "ES" }[] = [
    {
      value: "pt",
      label: "PT",
    },
    {
      value: "es",
      label: "ES",
    },
  ];

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    redirectTo(`/${event.target.value}`);
  };

  const { isNotebook } = useMediaQuery();

  useEffect(() => {
    if (route) {
      const currentRoute = languages.find((language) =>
        route.includes(language.value)
      );

      setCurrentLanguage(() => {
        return currentRoute ? currentRoute.value : "es";
      });
    }
  }, [route]);

  return (
    <Box
      component="header"
      style={{
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        zIndex: 3,
        width: "100%",
        background: hasScrolled ? "#fff" : "transparent",
        transition: "all .3s",
        boxShadow: "0px 7px 8px -1px rgba(0,0,0,0.15)",
      }}
    >
      <Image
        src={
          hasScrolled ? "/logos/ideia-logo-02.svg" : "/logos/ideia-logo-03.svg"
        }
        width={isNotebook ? "250px" : "200px"}
        height={isNotebook ? "50px" : "40px"}
        objectFit="contain"
        alt="cotizacionespy"
      />
      {/* <TextField
        id="outlined-select-currency"
        select
        value={currentLanguage}
        onChange={handleChange}
        style={{
          width: "5rem",
        }}
      >
        {languages.map((option: any) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField> */}
    </Box>
  );
};
