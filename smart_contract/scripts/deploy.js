const main = async () => {
  const Logistix = await hre.ethers.getContractFactory("Logistix");
  const logistix = await Logistix.deploy();

  await logistix.deployed();

  console.log("Logistix address: ", logistix.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();