import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState, useMemo } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Languages } from "../../types";
interface Props {
  hasScrolled: boolean;
}

export const Topbar = ({ hasScrolled }: Props) => {
  const [currentLanguage, setCurrentLanguage] = useState<Languages>("es");
  const { route, push: redirectTo } = useRouter();

  const languages: { value: Languages; label: "PT" | "ES" }[] = useMemo(() => ([
    {
      value: "pt",
      label: "PT",
    },
    {
      value: "es",
      label: "ES",
    },
  ]), []);

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
  }, [route, languages]);

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
        boxShadow: "0px 6px 6px 0px rgba(0,0,0,0.15)",
      }}
    >
      <Image
        src={
          hasScrolled ? "/logos/ideia-logo-02.svg" : "/logos/ideia-logo-03.svg"
        }
        width="200px"
        height="40px"
        objectFit="contain"
        alt="cotizacionespy"
      />
    </Box>
  );
};
