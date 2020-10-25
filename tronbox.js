require('dotenv').config()

const {
  PRIVATE_KEY
} = process.env
const port = PRIVATE_KEY || 9090

module.exports = {
  networks: {
    mainnet: {
      // Don't put your private key here:
      privateKey: PRIVATE_KEY,
      userFeePercentage: 0,
      consume_user_resource_percent: 0,
      fullHost: 'https://api.trongrid.io',
      network_id: '1'
    },
    shasta: {
      privateKey: PRIVATE_KEY,
      userFeePercentage: 0,
      consume_user_resource_percent: 0,
      fullHost: 'https://api.shasta.trongrid.io',
      network_id: '2'
    },
    nile: {
      privateKey: PRIVATE_KEY,
      fullNode: 'https://httpapi.nileex.io/wallet',
      solidityNode: 'https://httpapi.nileex.io/walletsolidity',
      eventServer: 'https://eventtest.nileex.io',
      network_id: '3'
    },
    development: {
      // For trontools/quickstart docker image
      privateKey: 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0',
      userFeePercentage: 0,
      feeLimit: 1e8,
      fullHost: 'http://127.0.0.1:' + port,
      network_id: '9'
    },
    compilers: {
      solc: {
        version: '0.5.10',
        optimizer: {
          enabled: true,
          runs: 200
        }
      },
    }
  }
}
