import abi from "./abi.json" assert {type:"json"};

const polygon = new Promise((res,rej)=>{
    async function meta(){
        if(typeof window.ethereum=="undefined"){
            rej("you should install Metamask");
        }

        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(abi,"0x290E9f4f24Bd4F6197F338C715Eef043795cE5F4");
        let account = await web3.eth.requestAccounts();//array of account 
        console.log("connected account :",account[0]);
 console.log(contract)
        let TotalSupply = await contract.methods.totalSupply().call({from:account[0]});
        console.log("Total supply ",TotalSupply);
        let maxsupply = await contract.methods.maxSupply().call({from:account[0]});
       
        let object = await contract.methods.getOwnerObjects().call({from:account[0]});
        console.log("your object ", object);
       

    


web3.eth.requestAccounts().then((account)=>{
    contract.methods.totalSupply().call({from:account[0]}).then((supply)=>{
        contract.methods.getObjects().call({from:account[0]}).then((data)=>{
            res({supply:supply,nft:data});
        });
    });

});
    }
    meta();
})

export default polygon;
