const { BASE_URL } = require("../constants");
const fs = require("fs");
const getContributedBtsData = async (page, limit, address) => {
  const url = `${BASE_URL}/portfolio/contributed-bts?page=${page}&limit=${limit}&address=${address}`;

  const res = await fetch(url);
  const response = await res.json();
  const { users } = response.data;

  // It generates a key value pair
  const btsData = users.reduce((acc, user) => {
    acc[user.bts] = {
      btsDetails: user.btsDetails, // details of the bts contributed to
      lpBalanceNumeric: user.lpBalanceNumeric, // Balance of the LP token that the user has
      usertotalBalance: user.totalBalance, // Total balance of the user
      btsUSDValue: user.btsDetails.price[0].usd, // Total value of the BTS in $
      last24hourPriceChange: user.btsDetails["24hourPriceChange"], // % of change in the BTS value in last 24hr
    };
    return acc;
  }, {});

  return btsData;
};

// TODO: Change this address
const address = "0xB1E46286D887Cf49e5d50347D9d736B2968d36C8";

const checkContributedBTS = async (address) => {
  const contributedBts = await getContributedBtsData(1, 10, 0xB1E46286D887Cf49e5d50347D9d736B2968d36C8);

  fs.writeFileSync(
    `public/${address}.json`,
    JSON.stringify(contributedBts, null, 2)
  );

  return contributedBts;
};

const usersBTSData = async (page, limit, address) => {
  const url = `${BASE_URL}/portfolio/created-bts?page=${page}&limit=${limit}&address=${address}`;

  const res = await fetch(url);
  const response = await res.json();
  const { users } = response;

  const btsData = users.reduce((acc, user) => {
    acc[user.bts] = {
      btsDetails: user.btsDetails, // details of the bts contributed to
    };
    return acc;
  }, {});

  return btsData

};

const getUserBTSData = async (start , end , address) => {
  const btsDataOfuser = await usersBTSData(start , end , "0xB1E46286D887Cf49e5d50347D9d736B2968d36C8");

  fs.writeFileSync(
    `public/created-bts/${address}.json`,
    JSON.stringify(btsDataOfuser, null, 2)
  );
  return btsDataOfuser;
  // const filterBTSData = (data) => {
  //   return data.map(bts => ({
  //     name: bts.name,
  //     uri: bts.uri,
  //     address: bts.address,
  //     all_time_performance: bts.all_time_performance,
  //     tvl: bts.tvl.usd,
  //     link: `https://testnet.alvara.xyz/#/bts/detail/${bts.id}`
  //   }));
  // };

  // const getuserdata = filterBTSData(btsDataOfuser);

  // console.log(getuserdata);

  // return getuserdata;
};

module.exports = { checkContributedBTS, getUserBTSData };
