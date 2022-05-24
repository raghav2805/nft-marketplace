
async function main() {
  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();

  await nft.deployed();

  console.log("NFT deployed to:", nft.address);

  const MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
  const marketplace = await MarketPlace.deploy(1);

  await marketplace.deployed();

  console.log("MarketPlace deployed to:", marketplace.address);
}

const runMain = async () => {
  try{
    await main();

    process.exit(0);
  }
  catch(err){
    console.error(err);
    process.exit(1);
  }
}

runMain();


// NFT deployed to: 0x1ddd129Bf220b9772571727a4d70efAA28832F94
//MarketPlace deployed to: 0x56c80135890B0FB942E2Dc7E13FFB7a49D1c59a5