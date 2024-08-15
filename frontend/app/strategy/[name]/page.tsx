"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

import { BASE_URL } from "@/config/address"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Investments {
  [btsId: string]: number // BTS ID as key, investment amount as value (0-100)
}

const StrategyPage = ({ strategy, bts }) => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const ArrayOfBTS = searchParams.get("btsData")
  console.log("searchParams", searchParams, ArrayOfBTS, JSON.parse(ArrayOfBTS!))

  const fetchDataBasedOnId = async (id) => {
    const url = `${BASE_URL}/bts/${id}`
    const response = await fetch(url)
    const res = await response.json()
    console.log("Response >>", res)
    return res
  }

  const [BTSData, setBTSData] = useState<any[]>([])
  useEffect(() => {
    if (ArrayOfBTS) {
      Promise.all(
        JSON.parse(ArrayOfBTS).map((id) => {
          return fetchDataBasedOnId(id)
        })
      ).then((btsArray) => {
        console.log("ArrayOfBTS >>", btsArray)
        setBTSData(btsArray)
      })
    }
  }, [ArrayOfBTS])

  console.log("BTSData", BTSData)

  const [investments, setInvestments] = useState<Investments>({})

  const handleInvestmentChange = (btsId, value) => {
    const newInvestments = { ...investments }
    const totalInvestment = Object.entries(newInvestments)
      .filter(([key]) => key !== btsId) // Exclude the current BTS
      .reduce((acc, [key, currValue]) => acc + currValue, 0)

    // Calculate the remaining percentage available
    const remainingPercentage = 100 - totalInvestment

    // Ensure the investment does not exceed the remaining percentage
    newInvestments[btsId] = Math.min(value, remainingPercentage)

    setInvestments(newInvestments)
  }

  console.log("Investments >>", investments)

  const handleInvest = () => {
    // Handle investment logic here
    console.log("Investments:", investments)
    // router.push("/confirmation")
  }

  return (
    <div>
      <div className="my-12 ml-12">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {strategy} Strategy
        </h1>

        <p className="max-w-[700px] text-lg text-muted-foreground">
          Set the percentage you want to contribute to
        </p>
      </div>
      <div>
        <Table>
          <TableCaption>Customise your contributions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>BTS Details</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Last24h Change</TableHead>
              <TableHead className="w-[350px]">Set Contribution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BTSData &&
              BTSData.map((bts) => (
                <TableRow key={bts._id}>
                  <TableCell className="font-medium">
                    <Image
                      src={bts.uri}
                      alt={bts.name}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <p className="text-lg font-medium leading-none">
                        {bts.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {bts.description?.slice(0, 25)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="capitalize">{bts.symbol}</p>
                  </TableCell>
                  <TableCell>
                    <p className="">${bts.price.usd.toFixed(2)}</p>
                  </TableCell>
                  <TableCell>
                    <p
                      className={` text-sm text-muted-foreground ${
                        bts["24hourPriceChange"] < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      &#40;{bts["24hourPriceChange"].toFixed(2)}%&#41;
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2">
                      <Slider
                        onValueChange={(value) => {
                          handleInvestmentChange(bts.id, value[0])
                        }}
                        max={100}
                        value={[investments[bts.id] || 0]} // Default to 0 if not set
                        className="w-[250px]"
                      />
                      <p>{investments[bts.id]} %</p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Button onClick={handleInvest}>Invest</Button>
    </div>
  )
}

export default StrategyPage
