import React from "react"
import Image from "next/image"

import { TokenList } from "@/config/TokenList"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectToken = () => {
  console.log("TokenList", TokenList)

  return (
    <div className="w-full">
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="Select Token" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {TokenList.map((token) => (
              <SelectItem value={token.name} className="cursor-pointer py-2">
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src={token.image}
                    alt={token.name}
                    height={30}
                    width={30}
                  />
                  <p> {token.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectToken
