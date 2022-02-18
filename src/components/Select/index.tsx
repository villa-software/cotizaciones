import React, { Dispatch, SetStateAction, ChangeEvent, useState } from "react";

import * as S from "./styles";

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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <label>{label}</label>
      <S.Select onClick={() => setIsExpanded(!isExpanded)}>
        <S.Display isExpanded={isExpanded}>{currency}</S.Display>
        <S.ListOptions isExpanded={isExpanded} optionsLenght={currenciesData}>
          {currenciesData.map((option: any) => (
            <S.Option
              key={option.value}
              onClick={() => setCurrency(option.value)}
            >
              {option.label}
            </S.Option>
          ))}
        </S.ListOptions>
        <S.Backdrop
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(false)}
        />
      </S.Select>
    </div>
  );
};
