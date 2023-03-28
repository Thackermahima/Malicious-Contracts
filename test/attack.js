const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Malicious External Contract", function(){
    it("Should change the owner of the Good Contract", async function(){
        const Malicious = await ethers.getContractFactory("Attack");
        const maliciousContract = await Malicious.deploy();
        await maliciousContract.deployed();
        console.log("Malicious Contrac's Address", maliciousContract.address);

        //Deploy the good contract

        const Good = await ethers.getContractFactory("Good");
        const goodContract = await Good.deploy(maliciousContract.address,{
            value : ethers.utils.parseEther("3")
        });
        await goodContract.deployed();
        console.log("Good Contract's Address: ", goodContract.address);

        const[_,addr1] = await ethers.getSigners();
        let tx = await goodContract.connect(addr1).addUserToList();
        await tx.wait();

        //Check if the user is eligible.
        const eligible = await goodContract.connect(addr1).isUserEligible();
         expect(eligible).to.equal(false);
    })
})