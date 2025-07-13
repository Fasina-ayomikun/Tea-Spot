import Image from "next/image";
import React from "react";
type CustomBtnProps = {
  text: string;
  btnType?: "submit" | "button";
  styles?: string;
  iconSrc?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
};
const CustomButton = ({
  text,
  handleClick,
  btnType,
  styles,
  iconSrc,
  isLoading,
}: CustomBtnProps) => {
  return (
    <button
      type={btnType || "button"}
      // onClick={handleClick}
      disabled={isLoading}
      className={`flex items-center justify-center     py-2 ${styles}`}
    >
      {iconSrc && <Image src={iconSrc} alt={text} width={20} height={20} />}
      {isLoading ? "Submitting..." : text}{" "}
    </button>
  );
};

export default CustomButton;
