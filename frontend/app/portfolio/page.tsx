"use client"
import PortfolioBody from '@/components/PortfolioBody';
import PortfolioHeader from '@/components/PortfolioHeader';
import PortfolioReveneues from '@/components/PortfolioReveneues';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import UserBtsPopover from '@/components/UserBtsPopover';

const PortfolioPage = () => {

    const activeAccount = useActiveAccount();

    const [userDetails, setUserDetails] = useState();

    const [value, setValue] = React.useState()
    const [selectedBTS, setSelectedBTS] = React.useState()

    const getPortfolioDetails = async ({
        page = 1,
        limit = 10
    }: {
        page?: number;
        limit?: number
    }) => {
        if (activeAccount) {
            const res = await fetch(`https://testnetapi.alvara.xyz/portfolio/created-bts?address=${activeAccount.address}&page=${page}&limit=${limit}`);
            const response = await res.json();

            const { users } = response;
            console.log("users details >>", users);

            setUserDetails(users);
            setValue(users[0]);
            setSelectedBTS(users[0]);
        }

    }


    return (
        <div className='flex flex-col'>
            <div>
                <Button onClick={getPortfolioDetails}>
                    Portfolio
                </Button>
            </div>

            {userDetails && (
                <>
                    <UserBtsPopover
                        userDetails={userDetails}
                        setValue={setValue}
                        value={value}
                        selectedBTS={selectedBTS}
                        setSelectedBTS={setSelectedBTS}
                    />

                    {userDetails && <div className="flex-1 space-y-4 p-8 pt-6">
                        <PortfolioHeader btsDetails={userDetails[0].btsDetails} />
                        <PortfolioReveneues btsDetails={userDetails[0].btsDetails} />
                        <PortfolioBody />
                    </div>}

                </>
            )}




        </div>
    );
};

export default PortfolioPage;