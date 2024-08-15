"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import sendTelegramMessage from "../actions/welcome"
import { InvestorCard } from "../components/investors/InvestorCard"

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<string>("")

  const handleCardSelect = (cardTitle: string) => {
    setSelectedCard(cardTitle)
  }

  const welcome = () => {
    const welcomeMessage = "Welcome to AlvaraXChainInvestment !"
    sendTelegramMessage("kamalthedev", welcomeMessage)
      .then((response: any) => console.log("Message sent:", response))
      .catch((error: any) => console.error("Error:", error))
  }

  return (
    <div className="flex flex-col gap-8 px-20 py-8">
      <div>
        <h5 className="text-[24px] font-[700]">EXPLORE</h5>
        <p className="text-[12px] font-[700] text-[#C3C3C3]">
          Choose your investor type
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <div className="flex flex-row justify-center gap-12 border-[#DCD2C7]">
          {["CONSERVATIVE", "MODERATE", "DEGEN"].map((title, index) => (
            <InvestorCard
              key={index}
              selected={selectedCard === title}
              title={title}
              volume="1,690,850"
              profit="$2011.08"
              handleCardSelect={handleCardSelect}
            />
          ))}
        </div>

        <Separator />
      </div>

      {selectedCard && (
        <div>
          <div>
            <h5 className="text-[24px] font-[700]">Create</h5>
            <p className="text-[12px] font-[700] text-[#C3C3C3]">
              Choose the bot type
            </p>
          </div>
          <div className="mt-[20px] flex flex-row space-x-[32px]  pb-[20px]">
            <div className="border-primary flex h-[238px] w-[393px] cursor-pointer flex-col rounded-[8px] border p-[21px] py-[15px]">
              <div className="flex flex-row gap-[10px]">
                <span className="text-[20px] font-[700]">USDT, LIDO, BNB</span>
                <span className="text-[20px] font-[700] text-[#D9D9D9]">
                  +4
                </span>
              </div>
              <p className="text-[12px] font-[700] text-[#C3C3C3]">
                The newest tokens in the market
              </p>
              <div className="mt-[26px] flex flex-row gap-[25px]">
                <div className="flex w-[66px] flex-col ">
                  <span className="h-[14px] text-[12px] font-[700] text-[#C3C3C3] ">
                    1 MONTH
                  </span>
                  <span className="mt-[6px] flex h-[25px] flex-row items-center text-[24px] font-[700]">
                    17%
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
                  <span className="h-[21px] text-[16px] font-[700] text-[#F24E1E]">
                    5/5
                  </span>
                </div>
                <div className="flex w-[66px] flex-col ">
                  <span className="h-[14px] text-[12px] font-[700] text-[#C3C3C3] ">
                    3 MONTH
                  </span>
                  <span className="mt-[6px] flex h-[25px] flex-row items-center text-[24px] font-[700]">
                    30%
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
                  <span className="h-[21px] text-[16px] font-[700] text-[#0FA958]">
                    3/5
                  </span>
                </div>
                <div className="flex w-[66px] flex-col ">
                  <span className="h-[14px] text-[12px] font-[700] text-[#C3C3C3] ">
                    6 MONTH
                  </span>
                  <span className="mt-[6px] flex h-[25px] flex-row items-center text-[24px] font-[700]">
                    42%
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
                  <span className="h-[21px] text-[16px] font-[700] text-[#0FA958]">
                    1/5
                  </span>
                </div>
              </div>
              <div className="flex ">
                <Button onClick={welcome} className="mt-[26px] w-full">
                  Create
                </Button>
              </div>
            </div>
            <div className="border-primary flex h-[238px] w-[393px] cursor-pointer flex-col rounded-[8px] border p-[21px] py-[15px]">
              <div className="flex flex-row gap-[10px]">
                <span className="text-[20px] font-[700]">MKR, MATIC, TRC</span>
                <span className="text-[20px] font-[700] text-[#D9D9D9]">
                  +4
                </span>
              </div>
              <p className="text-[12px] font-[700] text-[#C3C3C3]">
                The newest tokens in the market
              </p>
              <div className="mt-[26px] flex flex-row gap-[25px]">
                <div className="flex w-[66px] flex-col ">
                  <span className="h-[14px] text-[12px] font-[700] text-[#C3C3C3] ">
                    1 MONTH
                  </span>
                  <span className="mt-[6px] flex h-[25px] flex-row items-center text-[24px] font-[700]">
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
                  <span className="h-[21px] text-[16px] font-[700] text-[#F24E1E]">
                    5/5
                  </span>
                </div>
                <div className="flex w-[66px] flex-col ">
                  <span className="h-[14px] text-[12px] font-[700] text-[#C3C3C3] ">
                    3 MONTH
                  </span>
                  <span className="mt-[6px] flex h-[25px] flex-row items-center text-[24px] font-[700]">
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
                  <span className="h-[21px] text-[16px] font-[700] text-[#0FA958]">
                    3/5
                  </span>
                </div>
                <div className="flex w-[66px] flex-col ">
                  <span className="h-[14px] text-[12px] font-[700] text-[#C3C3C3] ">
                    6 MONTH
                  </span>
                  <span className="mt-[6px] flex h-[25px] flex-row items-center text-[24px] font-[700]">
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
                  <span className="h-[21px] text-[16px] font-[700] text-[#0FA958]">
                    4/5
                  </span>
                </div>
              </div>
              <div className="flex ">
                <Button className="mt-[26px] w-full">Create</Button>
              </div>
            </div>
            <Link href="/customise">
              <div className=" border-primary flex h-[238px] w-[393px] cursor-pointer flex-col items-center justify-center rounded-[8px] border p-[21px] py-[15px]">
                <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  Customise your investment by choosing own set % of tokens
                </h2>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
