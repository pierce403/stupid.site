abi=[
		{
			"constant": false,
			"inputs": [
				{
					"name": "stupidThing",
					"type": "string"
				}
			],
			"name": "addStupid",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "countStupid",
			"outputs": [
				{
					"name": "count",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "stupidStuff",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}
	]

console.log("OMG HERE WE GO");

try {
  console.log("HI! your default account is " + web3.eth.defaultAccount);
} catch (e) {
  $("#msg").html("The distributed web requires the <b>MetaMask</b> browser extension. Please go install it now.");
  console.log("o no..")
}

web3.version.getNetwork((err, netId) => {
  if (netId != 3) {
    $("#netwarn").html("Please switch MetaMask to the <b>Ropsten</b> network. "+netId);
  }
})

if (!web3.eth.defaultAccount) {
  //$("#msg").html("Please unlock MetaMask");
} else {
  web3.eth.getBalance(web3.eth.defaultAccount, function(error, result) {
    console.log(result)
    console.log(result.c[0] + " " + result.c[1]);

    // print balance:
    balance = result.c[0] / 10000;
    console.log("balance is " + balance);

    if (balance === 0) {
      $("#msg").html("Looks like you could use some ETH.");
    }
  })
}

const address = '0xc3302466aA628804607820bc8C40dd791c4B6d0C'; // yay mainnet

//alert('come on now');

// creation of contract object
var StupidContract = web3.eth.contract(abi);

// initiate contract for an address
var stupidContract = StupidContract.at(address);
console.log("stupidContract is "+stupidContract);

stupidTable = document.getElementById("stupidTable");

  stupidContract.countStupid(function (err, result){
    console.log("count is "+result);
    let count = result;
    for(let x=1;x<=10;++x)
    {
	    let row=stupidTable.insertRow(-1);
	    row.insertCell().innerText=count-x;
	    row.insertCell().innerText="";
    }
	  
    for(let x=1;x<=10;++x)
    {
	    stupidContract.stupidStuff(count-x,function(err,res){
		    console.log(x+": "+res);
		    if(res=="")return;
		    stupidTable.rows[x].cells[1].innerText=res;
	    });
    }
  });


function insert() {
  console.log("insert called!")

  let stupidThing = $("#stupidThing").val();

  var result = stupidContract.addStupid(stupidThing, function(err, res) {
    console.log(res);
  });

  console.log("update result:");
  console.log(result);
  $('#update-modal').modal('hide');
}
