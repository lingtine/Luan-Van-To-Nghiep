import React from "react";

import { Select, Option } from "@material-tailwind/react";
interface SelectBoxProps {
  options: [
    {
      label: string;
    }
  ];
  onChange: Function;
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, onChange }) => {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };
  const render = options.map((option) => {
    return <Option>{option.label}</Option>;
  });
  return <Select onChange={handleChange}>{render}</Select>;
};

export default SelectBox;
