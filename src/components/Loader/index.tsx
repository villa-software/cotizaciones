import { BarLoader } from "react-spinners";
import { css } from "@emotion/react";
import { Box } from "@mui/material";

interface Props {
  loading: boolean;
}

const override = css`
  display: block;
`;

export const Loader = ({ loading }: Props) => (
  <Box height={4}>
    <BarLoader
      height={4}
      loading={loading}
      color="blue"
      css={override}
      width="100%"
    />
  </Box>
);
