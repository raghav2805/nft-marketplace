const { expect } = require("chai");
const { ethers } = require("hardhat");
// import NFT from "../contracts/NFT.sol";
// import MarketPlace from "../contracts/MarketPlace.sol";

describe("NFTMarketPlace", function () {
    let contract, signers, signer,addr1,addr2;
    let percent = 1;
    let URI = "Sample URI";

    beforeEach(async () => {
        [signers,addr1,addr2] = await ethers.getSigners();

        const contractFactoryNFT = await ethers.getContractFactory("NFT");
        const contractFactoryMarketPlace = await ethers.getContractFactory("MarketPlace");

        signer = signers[0],

        contractNFT = await contractFactoryNFT.deploy();
        contractMarketPlace = await contractFactoryMarketPlace.deploy(percent);
    });

    describe("Deployment", async = () => {
        it("should track name and symbol from nft collection", async () => {

            expect(await contractNFT.name()).to.equal("NFT DAPP");
            expect(await contractNFT.symbol()).to.equal("dapp");
        })

        it("should track MarketPlace feeAccount and feePercent", async () => {
            expect(await contractMarketPlace.feeAccount()).to.equal(signer.address);
            expect(await contractMarketPlace.feePercent()).to.equal(percent);
        })
        it("Should track each minted NFT", async () => {
            await contractNFT.connect(addr1).mint(URI);
            expect(await contractNFT.tokenCount()).to.equal(1);
            expect(await contractNFT.balanceOf(addr1.address)).to.equal(1);
            expect(await contractNFT.tokenURI(1)).to.equal(URI);
            
            await contractNFT.connect(addr2).mint(URI);
            expect(await contractNFT.tokenCount()).to.equal(2);
            expect(await contractNFT.balanceOf(addr2.address)).to.equal(1);
            expect(await contractNFT.tokenURI(2)).to.equal(URI);
        })
    });



});
