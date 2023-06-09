// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Attack{
    address owner;
    mapping(address => bool) userEligible;

    constructor(){
        owner = msg.sender;
    }
    function isUserEligible(address user) public view returns(bool){
        if(user == owner){
            return true;
        } else {
            return false;
        }
    }
    function setUserEligible(address user) public {
      userEligible[user] = true;
    }
    fallback() external {}
}

