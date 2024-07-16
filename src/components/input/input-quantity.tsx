import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
interface InputQuantityProps {
  quantity: number;
  onChange: Function;
  maxQuantity: number;
  minQuantity?: number;
}

const InputQuantity: React.FC<InputQuantityProps> = ({
  quantity,
  onChange,
  maxQuantity = 99,
  minQuantity,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value === "") {
      if (minQuantity) {
        onChange(minQuantity);
        return;
      } else {
        onChange(0);
        return;
      }
    }
    const value = parseInt(e.target.value);
    if (value > maxQuantity) {
      onChange(maxQuantity);
    } else if (minQuantity && value < minQuantity) {
      onChange(minQuantity);
    } else {
      onChange(value);
    }
  };

  const handleDecrease = () => {
    if (minQuantity) {
      if (quantity === minQuantity) {
        onChange(minQuantity);
      } else {
        onChange(quantity - 1);
      }
    } else {
      if (quantity === 0) {
        onChange(0);
      } else {
        onChange(quantity - 1);
      }
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
    e.preventDefault();
    if (e.target.value === "") {
      if (minQuantity) {
        onChange(minQuantity);
        return;
      } else {
        onChange(0);
        return;
      }
    }
    const value = parseInt(e.target.value);
    if (value > maxQuantity) {
      onChange(maxQuantity);
    } else if (minQuantity && value < minQuantity) {
      onChange(minQuantity);
    } else {
      onChange(value);
    }
  };
  return (
    <div className="flex h-fit  items-center rounded-md min-w-[120px] justify-between border border-gray-400 max-w-[159px]">
      <span className={"p-2  "} onClick={handleDecrease}>
        <HiOutlineMinus />
      </span>

      <input
        aria-label="input-number"
        className={"max-w-[32px] text-center"}
        value={quantity}
        onBlur={handleBlur}
        onChange={handleChange}
        type={"number"}
      />
      <span className={"p-2"} onClick={handleIncrease}>
        <HiOutlinePlus />
      </span>
    </div>
  );
};

export default InputQuantity;
