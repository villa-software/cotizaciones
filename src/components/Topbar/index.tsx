import { useState, ChangeEvent, useEffect } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { useRouter } from "next/router";

export const Topbar = () => {
  const [currentLanguage, setCurrentLanguage] = useState<"pt" | "es">("es");
  const router = useRouter();

  const languages: { value: "pt" | "es"; label: "PT" | "ES" }[] = [
    {
      value: "pt",
      label: "PT",
    },
    {
      value: "es",
      label: "ES",
    },
  ];

  console.log({ router });

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    router.push(`/${event.target.value}`);
  };

  useEffect(() => {
    if (router) {
      const { route } = router;
      const currentRoute = languages.find((language) =>
        route.includes(language.value)
      );

      setCurrentLanguage(() => {
        return currentRoute ? currentRoute.value : "es";
      });
    }
  }, [router]);

  return (
    <Box component="header" style={{ background: "#fff", padding: "1rem" }}>
      Header
      <TextField
        id="outlined-select-currency"
        select
        value={currentLanguage}
        onChange={handleChange}
        style={{
          width: "100%",
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
