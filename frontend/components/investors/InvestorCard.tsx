import * as React from "react"
import Image from "next/image"
import { Bitcoin, CircleDollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const InvestorCard = ({
  title,
  volume,
  profit,
  selected,
  handleCardSelect,
}: {
  title: string
  volume: string
  profit: string
  selected: boolean
  handleCardSelect: (title: string) => void
}) => {
  const borderClass = selected ? "border-4" : "border"
  return (
    <Card
      className={`w-[350px] cursor-pointer ${borderClass} 
      ${title === "CONSERVATIVE" && selected && "border-green-600"}
       ${title === "MODERATE" && selected && "border-yellow-600"}
       ${title === "DEGEN" && selected && "border-red-600"}
      `}
      onClick={() => handleCardSelect(title)}
    >
      <CardHeader>
        <CardDescription className="flex flex-row justify-between">
          Investor :
          <div className="flex flex-row items-center gap-1">
            <span className="bg-accent text-primary flex h-[28px] px-1 py-2 items-center justify-center rounded-full text-[20px] font-[500]">
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
            </span>
            <span>3M</span>
          </div>
        </CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className=" max-w-[500px]">
          <Image
            src={`/${title.toLowerCase()}-investor.png`}
            alt={title}
            width={400}
            height={400}
            className="h-[250px]"
          />
        </div>
        <div className="mt-12 flex flex-col gap-2">
          <div className="flex items-center ">
            <div className="ml-4 space-y-1">
              <div className="flex  items-center gap-1">
                <CircleDollarSign />

                <p className="text-lg font-medium leading-none">Volume</p>
              </div>

              <p className="text-muted-foreground text-sm"></p>
            </div>
            <div className="ml-auto font-medium">{volume}</div>
          </div>
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <div className="flex  items-center gap-1">
                <Bitcoin />
                <p className="text-lg font-medium leading-none">Profit</p>
              </div>
              <p className="text-muted-foreground text-sm"></p>
            </div>
            <div className="ml-auto font-medium"> {profit}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { InvestorCard }
