import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
type CustomInputProps = {
  type?: string;

  isPassword: boolean;
  showPassword?: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  styles?: string;
  placeholder?: string;
  defaultValue?: string;
  showIcon?: boolean;
};

const CustomInput = ({
  type,
  styles,
  isPassword,
  showPassword,
  defaultValue,
  setShowPassword,
  setValue,
  showIcon,
  placeholder = "Enter details",
}: CustomInputProps) => {
  return (
    <div
      className={`w-full flex justify-between items-center px-3 my-4 border-[1px] relative    ${styles}`}
    >
      {showIcon && (
        <Image
          src={"/magnifying-glass.svg"}
          alt='Show'
          width={20}
          height={20}
          className=''
        />
      )}
      <input
        type={isPassword ? (showPassword ? "text" : "password") : "text"}
        name={type}
        defaultValue={defaultValue}
        onChange={(e) => setValue && setValue(e.target.value)}
        className={`text-sm  w-full focus:outline-none h-full 
border-0 px-3 py-1 bg-transparent`}
        placeholder={placeholder}
      />{" "}
      {isPassword &&
        (showPassword ? (
          <FaEyeSlash
            onClick={() => setShowPassword && setShowPassword(false)}
          />
        ) : (
          <FaEye onClick={() => setShowPassword && setShowPassword(true)} />
        ))}
    </div>
  );
};

export default CustomInput;
