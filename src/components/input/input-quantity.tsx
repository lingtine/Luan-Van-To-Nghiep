import { useState } from "react";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
interface InputQuantityProps {
  quantity: number;
  onChange: Function;
  maxQuantity: number;
}

const InputQuantity: React.FC<InputQuantityProps> = ({
  quantity,
  onChange,
  maxQuantity = 99,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onChange(value);
  };

  const handleDecrease = () => {
    if (quantity === 0) {
      onChange(0);
    } else {
      onChange(quantity - 1);
    }
  };
  const handleIncrease = () => {
    if (quantity >= maxQuantity) {
      onChange(maxQuantity);
    } else {
      onChange(quantity + 1);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      onChange(0);
      return;
    }
    const value = parseInt(e.target.value);
    if (value > maxQuantity) {
      onChange(maxQuantity);
    } else {
      onChange(value);
    }
  };
  return (
    <div className="flex h-fit items-center min-w-[120px] justify-between border border-color-black max-w-[159px]">
      <span
        className={"p-2 border-r border-r-color-black "}
        onClick={handleDecrease}
      >
        <HiOutlineMinus />
      </span>
      <input
        className={"max-w-[32px] text-center"}
        value={quantity}
        onBlur={handleBlur}
        onChange={handleChange}
        type={"number"}
      />
      <span
        className={
          "p-2 text-secondary bg-secondary-3 border-l border-l-secondary-3"
        }
        onClick={handleIncrease}
      >
        <HiOutlinePlus />
      </span>
    </div>
  );
};

export default InputQuantity;
