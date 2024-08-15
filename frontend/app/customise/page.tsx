"use client"

import React, { useState } from "react"
import Link from "next/link"
import Checkbox from "react-custom-checkbox"

import CustomiseForm from "@/components/customiseComponents/CustomiseForm"
import Info from "@/components/customiseComponents/Info"

import SidePanel from "../../components/Layout/SideBar"
import AIsuggestions from "../../components/custom-components/AIAnalysis"
import AddFunds from "../../components/custom-components/AddFunds"
import ChooseNetwork from "../../components/custom-components/ChooseNetwork"
import ChooseToken from "../../components/custom-components/ChooseToken"
import SelectFallBack from "../../components/custom-components/SelectFallBack"

const Customise = () => {
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSuggestionsChange = (checked) => {
    setShowSuggestions(checked)
    console.log("Suggestions checkbox checked: ", checked)
  }

  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/4">
          <Info />
        </div>

        <div className="w-3/4">
          <CustomiseForm />
        </div>
      </div>

      <div className="flex flex-row gap-[20px]">
        <SidePanel />
        <div className="flex flex-col">
          <p className="text-[24px] font-[700]">
            Customise an AI BOT for your Investment
          </p>
          <AddFunds />
          <ChooseToken />
          <ChooseNetwork />
          <SelectFallBack />
          <div className="flex flex-row gap-[20px]">
            <div className="flex flex-col mt-[45px]">
              <span className="text-primary font-[500] text-[16px]">
                STOP LOSS
              </span>
              <input
                type="text"
                className="px-[20px] mt-[7px] w-[290px] h-[45px] border border-[#DCD2C7] rounded-[7px]"
              />
            </div>
            <div className="flex flex-col mt-[45px]">
              <span className="text-primary font-[500] text-[16px]">
                TAKE PROFIT
              </span>
              <input
                type="text"
                className="px-[20px] mt-[7px] w-[290px] h-[45px] border border-[#DCD2C7] rounded-[7px]"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center mt-[42px]">
            <span className="text-primary font-[500] text-[20px]">
              Continuous monitoring ?
            </span>
            <Checkbox
              borderColor="#DCD2C7"
              borderRadius={4}
              borderWidth={1}
              size={20}
              checked={false}
              onChange={(checked) => console.log("checked: ", checked)}
              style={{ cursor: "pointer" }}
              uncheckedIcon={<div className="bg-white w-full h-full" />} // Customize unchecked state
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M3 0.287109C2.20435 0.287109 1.44129 0.60318 0.87868 1.16579C0.316071 1.7284 0 2.49146 0 3.28711L0 21.2871C0 22.0828 0.316071 22.8458 0.87868 23.4084C1.44129 23.971 2.20435 24.2871 3 24.2871H21C21.7956 24.2871 22.5587 23.971 23.1213 23.4084C23.6839 22.8458 24 22.0828 24 21.2871V3.28711C24 2.49146 23.6839 1.7284 23.1213 1.16579C22.5587 0.60318 21.7956 0.287109 21 0.287109L3 0.287109ZM18.045 7.74211C18.2533 7.95024 18.3718 8.23176 18.3749 8.52624C18.3779 8.82072 18.2654 9.10466 18.0615 9.31711L12.0735 16.8021C11.9706 16.913 11.8464 17.0019 11.7083 17.0637C11.5702 17.1254 11.4211 17.1587 11.2699 17.1615C11.1186 17.1643 10.9684 17.1365 10.8281 17.08C10.6879 17.0234 10.5604 16.9391 10.4535 16.8321L6.486 12.8631C6.37547 12.7601 6.28682 12.6359 6.22533 12.4979C6.16384 12.3599 6.13078 12.2109 6.12811 12.0599C6.12545 11.9088 6.15323 11.7588 6.20982 11.6187C6.2664 11.4786 6.35061 11.3514 6.45744 11.2446C6.56427 11.1377 6.69152 11.0535 6.8316 10.9969C6.97169 10.9403 7.12173 10.9126 7.27278 10.9152C7.42384 10.9179 7.57281 10.9509 7.71081 11.0124C7.84881 11.0739 7.97301 11.1626 8.076 11.2731L11.217 14.4126L16.4265 7.77511C16.5292 7.66406 16.6533 7.57487 16.7912 7.51286C16.9292 7.45085 17.0783 7.41731 17.2295 7.41423C17.3807 7.41115 17.531 7.4386 17.6714 7.49493C17.8118 7.55127 17.9394 7.63534 18.0465 7.74211H18.045Z"
                    fill="#DCD2C7"
                  />
                </svg>
              }
            />
          </div>
          <div className="flex flex-row justify-between items-center mt-[22px]">
            <span className="text-primary font-[500] text-[20px]">
              Suggestions from the AI Bot
            </span>
            <Checkbox
              borderColor="#DCD2C7"
              borderRadius={4}
              borderWidth={1}
              size={20}
              checked={false}
              onChange={handleSuggestionsChange}
              style={{ cursor: "pointer" }}
              uncheckedIcon={<div className="bg-white w-full h-full" />}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M3 0.287109C2.20435 0.287109 1.44129 0.60318 0.87868 1.16579C0.316071 1.7284 0 2.49146 0 3.28711L0 21.2871C0 22.0828 0.316071 22.8458 0.87868 23.4084C1.44129 23.971 2.20435 24.2871 3 24.2871H21C21.7956 24.2871 22.5587 23.971 23.1213 23.4084C23.6839 22.8458 24 22.0828 24 21.2871V3.28711C24 2.49146 23.6839 1.7284 23.1213 1.16579C22.5587 0.60318 21.7956 0.287109 21 0.287109L3 0.287109ZM18.045 7.74211C18.2533 7.95024 18.3718 8.23176 18.3749 8.52624C18.3779 8.82072 18.2654 9.10466 18.0615 9.31711L12.0735 16.8021C11.9706 16.913 11.8464 17.0019 11.7083 17.0637C11.5702 17.1254 11.4211 17.1587 11.2699 17.1615C11.1186 17.1643 10.9684 17.1365 10.8281 17.08C10.6879 17.0234 10.5604 16.9391 10.4535 16.8321L6.486 12.8631C6.37547 12.7601 6.28682 12.6359 6.22533 12.4979C6.16384 12.3599 6.13078 12.2109 6.12811 12.0599C6.12545 11.9088 6.15323 11.7588 6.20982 11.6187C6.2664 11.4786 6.35061 11.3514 6.45744 11.2446C6.56427 11.1377 6.69152 11.0535 6.8316 10.9969C6.97169 10.9403 7.12173 10.9126 7.27278 10.9152C7.42384 10.9179 7.57281 10.9509 7.71081 11.0124C7.84881 11.0739 7.97301 11.1626 8.076 11.2731L11.217 14.4126L16.4265 7.77511C16.5292 7.66406 16.6533 7.57487 16.7912 7.51286C16.9292 7.45085 17.0783 7.41731 17.2295 7.41423C17.3807 7.41115 17.531 7.4386 17.6714 7.49493C17.8118 7.55127 17.9394 7.63534 18.0465 7.74211H18.045Z"
                    fill="#DCD2C7"
                  />
                </svg>
              }
            />
          </div>
          {showSuggestions && <AIsuggestions />}
          <div className="flex justify-end">
            <Link href="/mybots">
              <button className="mt-[20px] h-[45px] w-[164px] bg-primary text-white font-[500] rounded-[10px]">
                Confirm ✅
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Customise
