import { useState, ChangeEvent, useEffect } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { useRouter } from "next/router";

import { Languages } from "../../types";

export const Topbar = () => {
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
      }}
    >
      Header
      <TextField
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
      </TextField>
    </Box>
  );
};
