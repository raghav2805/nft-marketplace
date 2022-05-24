require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.11',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/Mm3InxRu7BzBKzqQHEQZkI0hAK9drc7g',
      accounts: ['5431a34a614fae4c15a7040bb16916d5100ece3d02af7a2be3e1157bbf0846ad'],
    },
  },
};
