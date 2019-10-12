App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      // App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      alert("Please install web3 wallet like metamask");
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {

    $.getJSON('UserRegistration.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var ContractArtifact = data;
      App.contracts.UserRegContract = TruffleContract(ContractArtifact);
    
      // Set the provider for our contract
      App.contracts.UserRegContract.setProvider(App.web3Provider);

    });

    return App.bindEvents();
  },

  bindEvents: function() {
    App.handleEntry();
    let regBut = document.getElementById("user-reg");
    regBut.addEventListener("click", (e) => {
      App.handleUser(e);
    })
    let regButTop = document.getElementById("top_id_disp");
    regButTop.addEventListener("click", (e) => {
      App.handleUser(e);
    })
    // let displayWill = document.getElementById("willStringDisplay");
    // displayWill.addEventListener("click", (e) => {
    //   App.handleWillDisplay(e);
    // })
    let willFileUploadBtn = document.getElementById("willFileVal");
    willFileUploadBtn.addEventListener("change", (e) => {
      let file = document.getElementById('willFileVal').files[0];
      document.getElementById('fileUploadLabel').innerText = file.name.substr(0,15)+'...';
    });
    let willFile = document.getElementById("willFileSubmit");
    willFile.addEventListener("click", (e) => {
      e.preventDefault();
      let file = document.getElementById('willFileVal').files[0];
      document.getElementById('fileUploadLabel').innerText = file.name;
      let name = document.getElementById('willNameVal').value;
      uploadFile(file, name);
    });
    let heartBeatButton = document.getElementById("heartSubmit");
    heartBeatButton.addEventListener("click", (e) => {
      e.preventDefault();
      App.handleHeartbeatUpload();
    });

    let retrieveButton = document.getElementById("retrieveBtn");
    retrieveButton.addEventListener("click", (e) => {
      e.preventDefault();
      App.handleRetrieveBalOwner();
    });
    
  },

  handleEntry: function() {

    web3.eth.getAccounts(async function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log("Account:",account);
      const adoptionInstance = await App.contracts.UserRegContract.deployed();
      console.log(adoptionInstance);

      const isUserReg = await adoptionInstance.isRegistered(account);
      
      let regBut = document.getElementById("user-reg");
      let regButTop = document.getElementById("top_id_disp");

      if(isUserReg){
        regBut.innerText = `Welcome`;
        regButTop.innerText = account;
      }
    });
  },

  handleUser: function(event) {
    event.preventDefault();
    console.log("Register");

    web3.eth.getAccounts(async function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log("Account:",account);
      const adoptionInstance = await App.contracts.UserRegContract.deployed();
      console.log(adoptionInstance);

      const isUserReg = await adoptionInstance.isRegistered(account);

      if(isUserReg){
        // alert("User Already Registered"); 
        window.scrollTo(0,document.body.scrollHeight);
      } else {
        const setUse = await adoptionInstance.setUser(account, Date.now(), {from: account, value: web3.utils.toWei('2', "ether")});
        console.log(setUse);
        let regBut = document.getElementById("user-reg");
        regBut.innerText = `Welcome`;

        alert("User Registered!!");
        let bal = await adoptionInstance.getBalance();
        console.log("Bal:", bal);
      }
    });
  },

  handleWillUpload: function(res, name){
    web3.eth.getAccounts(async function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      const adoptionInstance = await App.contracts.UserRegContract.deployed();
      window.adoptionlol = adoptionInstance;

      const isUserReg = await adoptionInstance.isRegistered(account);

      if(!isUserReg){
        alert("User Not yet registered. Please register first!!");
        return; 
      } else {
        try{
          const willUploadTrans = await adoptionInstance.addWill(name, res[0].path, {from: account});
          console.log(res[0].path);
          alert("Uploaded Will!");
        } catch {
          alert("Error Occurred!");
        }
      }
    });
  },

  handleHeartbeatUpload: function(res, name){
    web3.eth.getAccounts(async function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      const adoptionInstance = await App.contracts.UserRegContract.deployed();
      window.adoptionlol = adoptionInstance;

      const updateHeartbeat = await adoptionInstance.giveHeartbeat(Date.now(), {from: account});

    });
  },

  handleRetrieveBalOwner: function(e){
    web3.eth.getAccounts(async function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      const adoptionInstance = await App.contracts.UserRegContract.deployed();
      window.adoptionlol = adoptionInstance;

      const retrieveTrans = await adoptionInstance.retrieveBalance();
      console.log(retrieveTrans);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

const ipfs = window.IpfsHttpClient('localhost', '5001');

async function uploadFile(file, name) {
  console.log(ipfs);
  ipfs.add(file, function(err, res) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
    App.handleWillUpload(res, name);
  });
}