// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PoolSwapAutomation is KeeperCompatibleInterface {
    IUniswapV2Router02 public uniswapRouter;
    IUniswapV2Pair public uniswapPair;
    AggregatorV3Interface public priceFeed;
    address public tokenA;
    address public tokenB;
    uint public lastCheckTime;
    uint public interval;
    uint public thresholdValue;
    uint public amountToSwap;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(
        address _uniswapRouter,
        address _uniswapPair,
        address _priceFeedAddress, // Chainlink Price Feed Address
        uint _interval,
        uint _thresholdValue,
        uint _amountToSwap
    ) {
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
        uniswapPair = IUniswapV2Pair(_uniswapPair);
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
        tokenA = uniswapPair.token0();
        tokenB = uniswapPair.token1();
        interval = _interval;
        thresholdValue = _thresholdValue;
        amountToSwap = _amountToSwap;
        owner = msg.sender;
        lastCheckTime = block.timestamp;
    }

    function checkUpkeep(
        bytes calldata
    ) external override returns (bool upkeepNeeded, bytes memory) {
        upkeepNeeded =
            (block.timestamp - lastCheckTime) > interval &&
            isPoolValueLow();
    }

    function performUpkeep(bytes calldata) external override {
        if ((block.timestamp - lastCheckTime) > interval && isPoolValueLow()) {
            lastCheckTime = block.timestamp;
            executeSwap();
        }
    }

    function isPoolValueLow() public view returns (bool) {
        uint poolValue = calculatePoolValue();
        int latestPrice = getLatestPrice();
        return poolValue < uint(latestPrice) * thresholdValue;
    }

    function getLatestPrice() public view returns (int) {
        (
            ,
            /* uint80 roundID */ int price,
            ,
            ,

        ) = /* uint startedAt */ /* uint timeStamp */ /* uint80 answeredInRound */
            priceFeed.latestRoundData();
        return price;
    }

    function calculatePoolValue() private view returns (uint) {
        // Implement your logic to calculate the pool's current value
        return 0; // Placeholder
    }

    function executeSwap() private {
        require(
            IERC20(tokenA).balanceOf(address(this)) >= amountToSwap,
            "Insufficient tokenA balance"
        );
        IERC20(tokenA).approve(address(uniswapRouter), amountToSwap);

        address[] memory path = new address[](2);
        path[0] = tokenA;
        path[1] = tokenB;

        uniswapRouter.swapExactTokensForTokens(
            amountToSwap,
            0, // Set minimum amount of tokenB to receive
            path,
            address(this),
            block.timestamp
        );
    }

    function updateInterval(uint newInterval) external onlyOwner {
        interval = newInterval;
    }

    function updateThresholdValue(uint newThresholdValue) external onlyOwner {
        thresholdValue = newThresholdValue;
    }

    function updateAmountToSwap(uint newAmountToSwap) external onlyOwner {
        amountToSwap = newAmountToSwap;
    }

    function withdrawTokens(address token) external onlyOwner {
        uint balance = IERC20(token).balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        IERC20(token).transfer(owner, balance);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        owner = newOwner;
    }
}
