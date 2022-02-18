import { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

export const InputGroup = ({ label, children }: Props) => {
  return (
    <div>
      <label>{label}</label>
      {children}
    </div>
  );
};
