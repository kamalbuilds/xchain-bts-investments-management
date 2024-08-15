import React from "react"
import Link from "next/link"

type BTSDataType = {
  tvl: string,
  all_time_performance: number,
  volume: number,
  priceChange: number,
  amount: string,
  total_supply: string
}

type BotCardProps = {
  title: string
  btsData: BTSDataType[]
  category: string
}

export const BotCard: React.FC<BotCardProps> = ({ title, btsData, category }) => {

    console.log(btsData,"btsdata")
  return (
    <div className="border-primary flex h-[238px] w-[393px] flex-col rounded-[8px] border p-[21px] py-[15px]">
      <div className="flex flex-row justify-between">
        <h3 className="text-[20px] font-[700]">{title}</h3>
        <Link href={`/bts/${category}`} legacyBehavior>
          <a className="text-[14px] font-[700] text-blue-500">See All</a>
        </Link>
      </div>
      <p className="text-[12px] font-[700] text-[#C3C3C3]">
        The newest tokens in the market
      </p>
      <div className="mt-[26px] flex flex-wrap gap-[10px]">
        {/*  20 -> group in 4 and show in cards  */}
        {btsData.slice(0, 4).map((bts, index) => (
          <div key={index} className="flex flex-col w-[80px]">
            <span className="text-[14px] font-[700]">{bts.amount}</span>
            <span className="text-[12px] font-[700] text-[#C3C3C3]">{bts.tvl.usd}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
