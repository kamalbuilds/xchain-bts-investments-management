import React, { useState, useEffect } from "react";

const AIAnalysis = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="mt-[20px] border-t border-b py-[20px]">
      <div className="flex flex-row gap-[8px]">
        <img className="w-[22px]" src="/aibot.svg" alt="" />{" "}
        <span className="text-primary text-[16px] font-[500]">ANALYSIS</span>
      </div>
      {loading ? (
        <div className="animate-pulse flex space-x-4 mt-6">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-[10px] bg-[#C3C3C3] rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-[10px] bg-[#C3C3C3] rounded"></div>
              <div className="h-[10px] bg-[#C3C3C3] rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="analysis flex flex-row mt-[26px] gap-[25px]">
          <div className="flex flex-col w-[66px] ">
            <span className="h-[14px] text-[12px] text-[#C3C3C3] font-[700] ">
              1 MONTH
            </span>
            <span className="flex flex-row mt-[6px] items-center text-[24px] h-[25px] font-[700]">
              18%
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.2809 15.9062C8.41351 15.9062 8.54069 15.8536 8.63446 15.7598C8.72823 15.666 8.7809 15.5389 8.7809 15.4062V3.61325L11.9269 6.76025C12.0208 6.85414 12.1481 6.90688 12.2809 6.90688C12.4137 6.90688 12.541 6.85414 12.6349 6.76025C12.7288 6.66636 12.7815 6.53903 12.7815 6.40625C12.7815 6.27347 12.7288 6.14614 12.6349 6.05225L8.6349 2.05225C8.58846 2.00569 8.53328 1.96874 8.47254 1.94354C8.41179 1.91833 8.34667 1.90536 8.2809 1.90536C8.21514 1.90536 8.15002 1.91833 8.08927 1.94354C8.02853 1.96874 7.97335 2.00569 7.9269 2.05225L3.9269 6.05225C3.83302 6.14614 3.78027 6.27347 3.78027 6.40625C3.78027 6.53903 3.83302 6.66636 3.9269 6.76025C4.02079 6.85414 4.14813 6.90688 4.28091 6.90688C4.41368 6.90688 4.54102 6.85414 4.63491 6.76025L7.7809 3.61325V15.4062C7.7809 15.5389 7.83358 15.666 7.92735 15.7598C8.02112 15.8536 8.1483 15.9062 8.2809 15.9062Z"
                  fill="#0FA958"
                />
              </svg>
            </span>
            <span className="text-[16px] h-[21px] font-[700] text-[#F24E1E]">
              5/5
            </span>
          </div>
          <div className="flex flex-col w-[66px] ">
            <span className="h-[14px] text-[12px] text-[#C3C3C3] font-[700] ">
              3 MONTH
            </span>
            <span className="flex flex-row mt-[6px] items-center text-[24px] h-[25px] font-[700]">
              40%
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.2809 15.9062C8.41351 15.9062 8.54069 15.8536 8.63446 15.7598C8.72823 15.666 8.7809 15.5389 8.7809 15.4062V3.61325L11.9269 6.76025C12.0208 6.85414 12.1481 6.90688 12.2809 6.90688C12.4137 6.90688 12.541 6.85414 12.6349 6.76025C12.7288 6.66636 12.7815 6.53903 12.7815 6.40625C12.7815 6.27347 12.7288 6.14614 12.6349 6.05225L8.6349 2.05225C8.58846 2.00569 8.53328 1.96874 8.47254 1.94354C8.41179 1.91833 8.34667 1.90536 8.2809 1.90536C8.21514 1.90536 8.15002 1.91833 8.08927 1.94354C8.02853 1.96874 7.97335 2.00569 7.9269 2.05225L3.9269 6.05225C3.83302 6.14614 3.78027 6.27347 3.78027 6.40625C3.78027 6.53903 3.83302 6.66636 3.9269 6.76025C4.02079 6.85414 4.14813 6.90688 4.28091 6.90688C4.41368 6.90688 4.54102 6.85414 4.63491 6.76025L7.7809 3.61325V15.4062C7.7809 15.5389 7.83358 15.666 7.92735 15.7598C8.02112 15.8536 8.1483 15.9062 8.2809 15.9062Z"
                  fill="#0FA958"
                />
              </svg>
            </span>
            <span className="text-[16px] h-[21px] font-[700] text-[#0FA958]">
              3/5
            </span>
          </div>
          <div className="flex flex-col w-[66px] ">
            <span className="h-[14px] text-[12px] text-[#C3C3C3] font-[700] ">
              6 MONTH
            </span>
            <span className="flex flex-row mt-[6px] items-center text-[24px] h-[25px] font-[700]">
              25%
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.2809 15.9062C8.41351 15.9062 8.54069 15.8536 8.63446 15.7598C8.72823 15.666 8.7809 15.5389 8.7809 15.4062V3.61325L11.9269 6.76025C12.0208 6.85414 12.1481 6.90688 12.2809 6.90688C12.4137 6.90688 12.541 6.85414 12.6349 6.76025C12.7288 6.66636 12.7815 6.53903 12.7815 6.40625C12.7815 6.27347 12.7288 6.14614 12.6349 6.05225L8.6349 2.05225C8.58846 2.00569 8.53328 1.96874 8.47254 1.94354C8.41179 1.91833 8.34667 1.90536 8.2809 1.90536C8.21514 1.90536 8.15002 1.91833 8.08927 1.94354C8.02853 1.96874 7.97335 2.00569 7.9269 2.05225L3.9269 6.05225C3.83302 6.14614 3.78027 6.27347 3.78027 6.40625C3.78027 6.53903 3.83302 6.66636 3.9269 6.76025C4.02079 6.85414 4.14813 6.90688 4.28091 6.90688C4.41368 6.90688 4.54102 6.85414 4.63491 6.76025L7.7809 3.61325V15.4062C7.7809 15.5389 7.83358 15.666 7.92735 15.7598C8.02112 15.8536 8.1483 15.9062 8.2809 15.9062Z"
                  fill="#0FA958"
                />
              </svg>
            </span>
            <span className="text-[16px] h-[21px] font-[700] text-[#0FA958]">
              4/5
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;
