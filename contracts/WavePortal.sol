// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    mapping(address => uint) public wavesDictionary;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
        wavesDictionary[msg.sender] += 1;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        console.log("%s has waved %d times", msg.sender, wavesDictionary[msg.sender]);
        return totalWaves;
    }
}