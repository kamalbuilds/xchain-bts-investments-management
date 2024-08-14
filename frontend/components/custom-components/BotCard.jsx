import React from "react";
import Link from "next/link";

function Card({ title, tagline, imageSrc, volume, profit, selected, onClick }) {
  const borderClass = selected ? "border-4" : "border";

  return (
    <div
      className={`flex flex-col h-[413px] w-[393px] py-[15px] cursor-pointer ${borderClass} border-primary rounded-[8px]`}
      onClick={onClick}
    >
      <div className="flex flex-row justify-end pr-[12px]">
        <span className="w-[63px] h-[28px] bg-accent rounded-[6px] flex justify-center items-center text-[20px] font-[500] text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M5.16602 21.3496C5.16602 21.3496 3.66602 21.3496 3.66602 19.8496C3.66602 18.3496 5.16602 13.8496 12.666 13.8496C20.166 13.8496 21.666 18.3496 21.666 19.8496C21.666 21.3496 20.166 21.3496 20.166 21.3496H5.16602ZM12.666 12.3496C13.8595 12.3496 15.0041 11.8755 15.848 11.0316C16.6919 10.1877 17.166 9.04308 17.166 7.84961C17.166 6.65614 16.6919 5.51154 15.848 4.66763C15.0041 3.82372 13.8595 3.34961 12.666 3.34961C11.4725 3.34961 10.3279 3.82372 9.48404 4.66763C8.64012 5.51154 8.16602 6.65614 8.16602 7.84961C8.16602 9.04308 8.64012 10.1877 9.48404 11.0316C10.3279 11.8755 11.4725 12.3496 12.666 12.3496Z"
              fill="#6E5B98"
            />
          </svg>
          3M
        </span>
      </div>
      <div className="flex flex-row justify-center mt-[8px]">
        <img className="w-[200px] h-[200px]" src={imageSrc} alt="" />
      </div>
      <p className="ml-[30px] mt-[20px] text-primary font-[700] text-[28px]">
        {title} Investor
      </p>
      <p className="ml-[30px] mt-[20px] text-primary font-[700] text-[14px]">
        {tagline}
      </p>
      <div className="flex flex-row gap-x-[60px] mt-[20px] ml-[30px]">
        <div className="flex flex-col">
          <span className="text-[14px] font-[500] text-grey">Volume</span>
          <span className="text-[20px] text-primary font-[500]">{volume}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] font-[500] text-grey">Profit</span>
          <span className="text-[20px] text-primary font-[500]">{profit}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
