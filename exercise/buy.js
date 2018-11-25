const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('./contract/Bank_sol_Bank.abi').toString())
const address = fs.readFileSync('./address.txt').toString()

let bank = new web3.eth.Contract(abi, address)

web3.eth.getAccounts().then(function (accounts) {

    // accounts[1] buy 1 * 10**18 coins
    // your code

    bank.methods.buy(1).send({
        from: accounts[1],
        gas: 4000000,
    })
    .on('receipt', console.log)
    .on('error', console.error)

    /*
    web3.eth.getTransactionCount(accounts[1]).then(function(nonce){

        let data = bank.methods.buy(1).encodeABI(); //.then(function(data){

            let transaction = {
                from: accounts[1],
                to: address,
                data,
                gas: 4000000,
                nonce,
                value: '0x0',
            }

        //}).catch(err => console.log(err));

        web3.eth.sendTransaction(transaction) //ganachi-cli 預設就沒有鎖住
        .on("receipt", (receipt) => {
            console.log(receipt);
        });

    }).catch(err => console.log(err));*/


}).catch(err => console.log(err));
