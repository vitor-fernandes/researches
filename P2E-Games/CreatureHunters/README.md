# CreatureHunters-bot
This is a Bot to Hack the Creature Hunters Game (https://creaturehunters.world/gameplay)...

Was developed to proof the existence of a vulnerability in their system that allows an user to manipulate the scores and ever win the battles, which allows the withdraw of the funds.


##### 10/01/2022 -> This not works Anymore :(
    - At this point, CreatureHunters implemented a restriction which all users must have a NFT card to battle and also uses Google as account provider
    - Further analysis will be made in the future to try the bypass of this mechanism


This exploit receive a mnemonic as parameter and will generate 150 accounts to play the game, make score, withdraw the funds, swap it to BUSD and send it to the main account.

All the steps of this bot can be found below: 
* Generating the main account (and this account must have BNB to send to the child accounts to pay for transactions fees)
* Send a quantity of 0.03 BNB to the child account
* Create a new account on the CreatureHunters Game by sending a request to the "/login" endpoint with the signature of the account.
* Make the necessary points to withdraw (15000)
* Generate the withdraw request with all the points
* Send the transaction to the Smart Contract with the owner's signature
* Swap the CHTS token to BUSD via PancakeSwap
* Send the BUSD to the Main account
* Send the remaining BNB to the Main Account


This bot was been modified during the research, however, this is the last version of it!
