# Logistixx
This is a Logistics application that automates transfer of cryptocurrency when delivery of goods is successful.
This repository contains a smart contract and a web application.

Smart contract
The smart contract runs on the Ethereum blockchain.
The source code is under the MIT license.

Getting started
First of all, install npm packages: npm install.

Deploy to Goerli
First of all, you will need some ethereum. Use this faucet: https://faucet.metamask.io.

How to use the smart contract?
To use the smart contract, you need to create a web3 Contract with the ABI and address of Logistix.sol.

The roles are:

supplier: can create products and send them
Delivery man: can receive and send products
purchaser: can receive the product
owner: grant and revoke roles
The supplier creates a product and tells to which address the product will ultimately belong to. Then, it can either send this product to a delivery man or directly to the purchaser.

The delivery man is an intermediary person. There can be as much as Delivery Men in the supply channel as it is needed. Ultimately, a Delivery Man will send the product to the purchaser.

The Purchaser doesn't order a product through the app (at least for now). This is the supplier that creates a product for a purchaser. The only action a purchaser can do is receive the product from the person who sends it to him.

The owner can't manipulate products.

When a handover happens?
For a handover to happens, the two participants must agree on it.

the sender must declare that it sent the product to the receiver,
the receiver must declare that it received the same product from the sender.
Data structure
For each product:

product ID: collected in the front-end app but not stored anywhere
product hash: sha3 of the product ID, stored in the smart contract
product name: collected in the front-end app and stored in the smart contract
purchaser: the address of the person who purchased the product
For each account

name: a string representing the name of the user.
