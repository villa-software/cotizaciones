import useMedia from "@mui/material/useMediaQuery";

import { themeStyled } from "../styles/themes/styled";

export const useMediaQuery = () => {
  const isDesktop = useMedia(`(min-width: ${themeStyled.breakpoints.desktop})`);
  const isTablet = useMedia(`(min-width: ${themeStyled.breakpoints.tablet})`);

  return { isDesktop, isTablet };
};
