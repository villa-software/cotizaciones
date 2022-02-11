import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { TextField, MenuItem } from "@mui/material";

type Currency = "USD" | "BRL" | "PYG";

interface Props {
  label: string;
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
  currenciesData: any;
}

export const Select = ({
  currency,
  setCurrency,
  currenciesData,
  label,
}: Props) => {
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCurrency(event.target.value as Currency);
  };
  return (
    <TextField
      id="outlined-select-currency"
      select
      label={label}
      value={currency}
      onChange={handleChange}
      style={{
        width: "100%",
      }}

      //helperText="Please select your currency"
    >
      {currenciesData.map((option: any) => (
        <MenuItem key={option.value} value={option.value}>
          <>{option.label}</>
        </MenuItem>
      ))}
    </TextField>
  );
};
