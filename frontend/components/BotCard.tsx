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


// import React from 'react';

// const BotCard = ({ title , btsData , category }) => {
//   const renderCards = () => {   
//     const numCards = Math.ceil(btsData.length / 2);
//     const cards = [];

//     for (let i = 0; i < numCards; i++) {
//       const startIdx = i * 2;
//       const endIdx = startIdx + 2;
//       const btsSubset = btsData.slice(startIdx, endIdx);
      
//       cards.push(
//         <div key={i} className="border-primary flex h-[238px] w-[393px] cursor-pointer flex-col rounded-[8px] border p-[21px] py-[15px]">
//           <div className="flex flex-row gap-[10px]">
//             <span className="text-[20px] font-[700]">{btsSubset.map(b => b.symbol).join(', ')}</span>
//             <span className="text-[20px] font-[700] text-[#D9D9D9]">
//               +{btsSubset.length}
//             </span>
//           </div>
//           <p className="text-[12px] font-[700] text-[#C3C3C3]">
//             The newest tokens in the market
//           </p>
//           <div className="mt-[26px] flex flex-row gap-[25px]">
//             {['1 MONTH', '3 MONTH', '6 MONTH'].map((period, idx) => (
//               <div key={idx} className="flex w-[66px] flex-col ">
//                 <span className="h-[14px] text-[12px] font-[700] text-[#C3C3C3] ">
//                   {period}
//                 </span>
//                 <span className="mt-[6px] flex h-[25px] flex-row items-center text-[24px] font-[700]">
//                   {btsSubset[idx]?.performance || '0%'}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="17"
//                     height="17"
//                     viewBox="0 0 17 17"
//                     fill="none"
//                   >
//                     <path
//                       fill-rule="evenodd"
//                       clip-rule="evenodd"
//                       d="M8.2809 15.9062C8.41351 15.9062 8.54069 15.8536 8.63446 15.7598C8.72823 15.666 8.7809 15.5389 8.7809 15.4062V3.61325L11.9269 6.76025C12.0208 6.85414 12.1481 6.90688 12.2809 6.90688C12.4137 6.90688 12.541 6.85414 12.6349 6.76025C12.7288 6.66636 12.7815 6.53903 12.7815 6.40625C12.7815 6.27347 12.7288 6.14614 12.6349 6.05225L8.6349 2.05225C8.58846 2.00569 8.53328 1.96874 8.47254 1.94354C8.41179 1.91833 8.34667 1.90536 8.2809 1.90536C8.21514 1.90536 8.15002 1.91833 8.08927 1.94354C8.02853 1.96874 7.97335 2.00569 7.9269 2.05225L3.9269 6.05225C3.83302 6.14614 3.78027 6.27347 3.78027 6.40625C3.78027 6.53903 3.83302 6.66636 3.9269 6.76025C4.02079 6.85414 4.14813 6.90688 4.28091 6.90688C4.41368 6.90688 4.54102 6.85414 4.63491 6.76025L7.7809 3.61325V15.4062C7.7809 15.5389 7.83358 15.666 7.92735 15.7598C8.02112 15.8536 8.1483 15.9062 8.2809 15.9062Z"
//                       fill="#0FA958"
//                     />
//                   </svg>
//                 </span>
//                 <span className="h-[21px] text-[16px] font-[700] text-[#0FA958]">
//                   {btsSubset[idx]?.rating || 'N/A'}
//                 </span>
//               </div>
//             ))}
//           </div>
//           <div className="flex ">
//             <button className="mt-[26px] w-full">
//               Create
//             </button>
//           </div>
//         </div>
//       );
//     }

//     return cards;
//   };

//   return (
//     <div>
//       <div>
//         <h5 className="text-[24px] font-[700]">Create</h5>
//         <p className="text-[12px] font-[700] text-[#C3C3C3]">
//           Choose the bot type
//         </p>
//       </div>
//       <div className="mt-[20px] flex flex-wrap gap-[32px] pb-[20px]">
//         {renderCards()}
//       </div>
//     </div>
//   );
// };

// export default BotCard;
