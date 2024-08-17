// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Line, LineChart } from 'recharts';
import { Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';


const ChartsPage = () => {
    const [sevenDaysPriceData, setSevenDaysPriceData] = useState(null);

    const handleData = async () => {
        const response = await fetch('https://testnetapi.alvara.xyz/bts/manager?id=668a94b70e01b016cbc15ca2');
        console.log("Response >>>", response);

        const { data } = await response.json();

        const sevenDaysPrice = data[0]['7DaysPrice'];
        console.log("sevenDaysPrice", sevenDaysPrice);

        if (sevenDaysPrice) {
            const chartData = sevenDaysPrice.map((price, index) => ({
                day: `Day ${index + 1}`,
                price: price[0],
            }));
            console.log("Chart Data", chartData);

            const chartConfig = {
                price: {
                    label: "Price",
                    color: "#60a5fa",
                },
            } satisfies ChartConfig;

            setSevenDaysPriceData({ chartData, chartConfig });
        }
    }

    return (
        <div>
            hello world
            <Button onClick={handleData}> Get Data </Button>

            {sevenDaysPriceData && (
                <div>
                    <ChartContainer config={sevenDaysPriceData.chartConfig} className="min-h-[200px] w-[1000px]">
                        <LineChart accessibilityLayer data={sevenDaysPriceData.chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Line dataKey="price" stroke="var(--color-price)" dot={false} />
                        </LineChart>
                    </ChartContainer>
                </div>
            )}
        </div>
    );
};

export default ChartsPage;