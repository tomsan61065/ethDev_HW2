const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('./contract/Bank_sol_Bank.abi').toString())
const bytecode = '0x' + fs.readFileSync('./contract/Bank_sol_Bank.bin').toString()

let bank = new web3.eth.Contract(abi) //bank contract

web3.eth.getAccounts().then(function (accounts) {

    // deploy contract
    // your code

    //use ganachi-cli
    //private key
    // 0xdcc8c4532050356ac5668d48a21fc28f50c8f3afa121c6be73d364dfd7c7160e 
    // 0xa2f94ffcf078999dc2c48b23aefb5e6fa62dcd71c87c8b071c08a56e73883ef3
    // 0x5c63d80b2552f4609cf8f4c428b89f82cf0cf8d1f6ecf32eece3da785d6168cf
    //public 
    // 0x021fa47a9dced3b2337fe7aae2eb1c75d5a3a688
    // 0xcfd5db38108c75ad7f4cc8a383de31ce596830c6
    // 0x7175832dad98a185de29ff8f3511dd25d004cb67
    //ganache-cli --account="0xdcc8c4532050356ac5668d48a21fc28f50c8f3afa121c6be73d364dfd7c7160e, 1234567890125678901234567890" --account="0xa2f94ffcf078999dc2c48b23aefb5e6fa62dcd71c87c8b071c08a56e73883ef3, 1234567890125678901234567890" --account="0x5c63d80b2552f4609cf8f4c428b89f82cf0cf8d1f6ecf32eece3da785d6168cf, 1234567890125678901234567890"

    bank.deploy({
        data: bytecode,
    })
    .send({
        from: accounts[0],
        gas: 4000000,
    })
    .on("receipt", function(rec){
        fs.writeFileSync("./address.txt", rec.contractAddress);
        console.log(rec);
    })
    .on("error", console.error);

    /*
    web3.eth.getTransactionCount(accounts[0]).then(function(nonce){

        let transaction = {
            from: accounts[0],
            data: bytecode,
            gas: 4000000,
            nonce,
            value: '0x0',
        };

        web3.eth.sendTransaction(transaction) //ganachi-cli 預設就沒有鎖住
        .on("receipt", (receipt) => {
            console.log(receipt);
        });

    }).catch(err => console.log(err));

    // 用 private key sign 的方法
    ....
    */

});