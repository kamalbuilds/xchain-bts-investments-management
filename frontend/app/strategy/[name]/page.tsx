import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const StrategyPage = ({ strategy, bts }) => {
  const router = useRouter();
  const [investments, setInvestments] = useState({});

  const handleInvestmentChange = (btsId, value) => {
    setInvestments({ ...investments, [btsId]: value });
  };

  const handleInvest = () => {
    // Handle investment logic here
    console.log("Investments:", investments);
    router.push("/confirmation");
  };

  return (
    <div>
      <h2>{strategy} Strategy</h2>
      {bts.map((bts) => (
        <div key={bts.id}>
          <p>{bts.name}</p>
          <Slider
            value={investments[bts.id] || 0}
            onChange={(value) => handleInvestmentChange(bts.id, value)}
            max={100}
          />
        </div>
      ))}
      <Button onClick={handleInvest}>Invest</Button>
    </div>
  );
};

// Example: Static generation of the strategy page (Next.js specific)
export async function getStaticProps(context) {
  const { strategy } = context.params;
  const btsData = await fetchBTSData();
  const grouped = groupBTSByStrategy(btsData);

  return {
    props: {
      strategy: strategy.toUpperCase(),
      bts: grouped[strategy.toUpperCase()] || [],
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { strategy: "conservative" } },
      { params: { strategy: "moderate" } },
      { params: { strategy: "degen" } },
    ],
    fallback: false,
  };
}

export default StrategyPage;
