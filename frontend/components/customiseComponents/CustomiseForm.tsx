import React from "react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import SelectChain from "./SelectChain"
import SelectToken from "./SelectToken"

const CustomiseForm = () => {
  return (
    <div className="flex flex-col">
      <div>
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Customise an AI BOT for your Investment
        </h2>
      </div>
      <div className="flex max-w-md flex-col">
        <div className="flex w-full items-center space-x-2">
          <Input id="picture" type="text" className="w-3/4" />
          <Button type="submit" className="w-1/4">
            Add Funds{" "}
          </Button>
        </div>

        <SelectToken />
        <SelectChain />
      </div>
    </div>
  )
}

export default CustomiseForm
