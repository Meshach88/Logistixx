// https://eth-goerli.g.alchemy.com/v2/Fc8xAfQLC4KxOmxtD35D4jPO-7ltAt-g

require("@nomicfoundation/hardhat-toolbox");
// require('@nomiclabs/hardhat-waffle');


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.6.0",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/Fc8xAfQLC4KxOmxtD35D4jPO-7ltAt-g',
      accounts: [ '53b8303447fff58ba7018b2b01a9c3178e4feca80203f738e0b2e0ab6416b516' ]
    }
  }
};
