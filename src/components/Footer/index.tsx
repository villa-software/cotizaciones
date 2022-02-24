import Image from "next/image";

import { Box } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      style={{
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src="/images/vila-software-logo.png"
        alt="Vila Software"
        width={64}
        height={36}
        objectFit="cover"
      />
      <span style={{ marginLeft: "1rem" }}>
        © 2022 Vila Software - Todos los derechos reservados
      </span>
    </Box>
  );
};
