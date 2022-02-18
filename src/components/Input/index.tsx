import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

interface Props {
  label: string;
  fullWidth: boolean;
  value: string;
  onChange: (e: any) => void;
  placeholder: string;
  type: "text" | "number";
}

const CustomInput = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: ".5rem",
    transition: "all .2s",
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2,
  },
  "& input:valid:hover + fieldset": {
    borderColor: "#aaa",
  },
  "& input:valid:focus + fieldset": {
    borderColor: "blue",
  },
});

export const Input = ({
  label,
  fullWidth,
  value,
  onChange,
  placeholder,
  type = "text",
}: Props) => {
  return (
    <div>
      <label>{label}</label>
      <CustomInput
        fullWidth={fullWidth}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};
