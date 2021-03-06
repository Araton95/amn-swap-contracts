const Factory = artifacts.require('uniswapv2/UniswapV2Factory.sol');
const Router = artifacts.require('uniswapv2/UniswapV2Router02.sol');
const WETH = artifacts.require('WETH.sol');
const MockERC20 = artifacts.require('MockERC20.sol');
const SushiToken = artifacts.require('SushiToken.sol')
const MasterChef = artifacts.require('MasterChef.sol');
const SushiBar = artifacts.require('SushiBar.sol');
const SushiMaker = artifacts.require('SushiMaker.sol');

const {
  DEPLOYER_ADDRESS
} = process.env

module.exports = async function(deployer, _network, addresses) {
  const admin = DEPLOYER_ADDRESS;

  await deployer.deploy(WETH);
  const weth = await WETH.deployed();
  const tokenA = await MockERC20.new('Token A', 'TKA', '1000000000');
  const tokenB = await MockERC20.new('Token B', 'TKB', '1000000000');

  await deployer.deploy(Factory, admin);
  const factory = await Factory.deployed();
  await factory.createPair(weth.address, tokenA.address);
  await factory.createPair(weth.address, tokenB.address);
  await deployer.deploy(Router, factory.address, weth.address);
  const router = await Router.deployed();

  await deployer.deploy(SushiToken);
  const sushiToken = await SushiToken.deployed();

  await deployer.deploy(
    MasterChef,
    sushiToken.address,
    admin,
    '100000000',
    1,
    1
  );
  const masterChef = await MasterChef.deployed();
  await sushiToken.transferOwnership(masterChef.address);

  await deployer.deploy(SushiBar, sushiToken.address);
  const sushiBar = await SushiBar.deployed();

  await deployer.deploy(
    SushiMaker,
    factory.address,
    sushiBar.address,
    sushiToken.address,
    weth.address
  );
  const sushiMaker = await SushiMaker.deployed();
  await factory.setFeeTo(sushiMaker.address);
};