// @ts-nocheck
"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import axios from "axios";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import TelegramLoginButton from "telegram-login-button";
import InvestmentPanel from "../../components/Layout/InvestmentPanel";
import sendTelegramMessage from "../../actions/welcome";
import { useParams } from "next/navigation";

export default function MyBots() {

  const params = useParams()

  const { id, first_name, last_name, username, photo_url, auth_date, hash } = params;

  const isLoggedIn = Boolean(id);

  console.log(id);

  const [series, setSeries] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("ethereum");

  useEffect(() => {
    if (isLoggedIn && id) {
      const welcomeMessage = "Welcome to the XChain-BTS-Investment Bot!";
      sendTelegramMessage(id, welcomeMessage)
        .then((response: any) => console.log("Message sent:", response))
        .catch((error: any) => console.error("Error:", error));
    }
  }, [id, isLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      // fetch the data from the coingecko api
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${selectedCurrency}/ohlc?vs_currency=usd&days=14`
      );
      const formattedData = response.data.map((x: any) => ({
        x: new Date(x[0]),
        y: [x[1], x[2], x[3], x[4]],
      }));
      setSeries([{ data: formattedData }]);
    };

    fetchData();
  }, [selectedCurrency]);


  // show the chart via candlestick
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="flex flex-row">
      <InvestmentPanel />
      <div className="w-full flex-shrink-0 ">
        <div className="flex flex-row h-[70px] w-full border border-[#DCD2C7]">
          <div className="w-[160px] px-[40px] py-[21px] items-center border-r">
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="outline-none font-[700] text-grey text-[20px]"
            >
              <option value="ethereum">ETH</option>
              <option value="usd-coin">USDC</option>
              <option value="tether">USDT</option>
              <option value="chainlink">LINK</option>
            </select>
          </div>
          <div className="absolute top-[125px] right-[30px]">
            {!isLoggedIn ? (
              <TelegramLoginButton
                botName="alvara_xchain_investment_bot"
                dataOnauth={(user) => console.log(user)}
                dataAuthUrl="https://xchain-alvara-investments.vercel.app/myaibot"
                cornerRadius={5}
              />
            ) : (
              <div className="flex flex-row gap-[5px] px-[10px] items-center rounded-[5px] bg-[#54A9EA] w-[160px] h-[40px]">
                <img
                  className="h-[30px] w-[30px] rounded-full"
                  src={decodeURIComponent(photo_url)}
                  alt=""
                />
                <span className="text-white font-[16px]">
                  {first_name} {last_name}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="">
          <div className="chart">
            <ApexChart
              options={options}
              series={series}
              type="candlestick"
              height={700}
              width={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
