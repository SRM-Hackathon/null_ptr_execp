App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    // $.getJSON('../pets.json', function(data) {
    //   var petsRow = $('#petsRow');
    //   var petTemplate = $('#petTemplate');

    //   for (i = 0; i < data.length; i ++) {
    //     petTemplate.find('.panel-title').text(data[i].name);
    //     petTemplate.find('img').attr('src', data[i].picture);
    //     petTemplate.find('.pet-breed').text(data[i].breed);
    //     petTemplate.find('.pet-age').text(data[i].age);
    //     petTemplate.find('.pet-location').text(data[i].location);
    //     petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

    //     petsRow.append(petTemplate.html());
    //   }
    // });
    

    return await App.initWeb3();
  },

  initWeb3: async function() {
    /*
     * Replace me...
     */
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
    /*
     * Replace me...
     */
    $.getJSON('UserRegistration.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
    
      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      // return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    // $(document).on('click', '.btn-adopt', App.handleAdopt);
    let regBut = document.getElementById("user-reg");
    regBut.addEventListener("click", (e) => {
      App.handleAdopt(e);
    })
    let uploadWill = document.getElementById("willStringSubmit");
    uploadWill.addEventListener("click", (e) => {
      App.handleWillUpload(e);
    })
    let displayWill = document.getElementById("willStringDisplay");
    displayWill.addEventListener("click", (e) => {
      App.handleWillDisplay(e);
    })

    App.handleEntry();
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;

      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleEntry: function() {

    web3.eth.getAccounts(async function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log("Account:",account);
      const adoptionInstance = await App.contracts.Adoption.deployed();
      console.log(adoptionInstance);

      const isUserReg = await adoptionInstance.isRegistered(account);
      
      let regBut = document.getElementById("user-reg");
      if(isUserReg){
        regBut.innerText = `Welcome`;
      }
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();
    console.log("Register");

    web3.eth.getAccounts(async function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log("Account:",account);
      const adoptionInstance = await App.contracts.Adoption.deployed();
      console.log(adoptionInstance);

      const isUserReg = await adoptionInstance.isRegistered(account);

      if(isUserReg){
        alert("User Already Registered"); 
      } else {
        const setUse = await adoptionInstance.setUser(account, {from: account});
        alert("User Registered!!");
      }
    });
  },

  handleWillUpload: function(e){
    e.preventDefault();

    web3.eth.getAccounts(async function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log("Account:",account);
      const adoptionInstance = await App.contracts.Adoption.deployed();
      window.adoptionlol = adoptionInstance;
      console.log(adoptionInstance);

      const isUserReg = await adoptionInstance.isRegistered(account);

      if(!isUserReg){
        alert("User Not yet registered. Please register first!!");
        return; 
      } else {
        const willStringVal = document.getElementById("willStringVal").value;
        try{
          const willUploadTrans = await adoptionInstance.addWill(willStringVal, {from: account});
          console.log(willUploadTrans);
          alert("Uploaded Will!");
        } catch {
          alert("Error Occurred!");
        }
      }
    });
  },

  handleWillDisplay: async function(e){
    e.preventDefault();

    web3.eth.getAccounts(async function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log("Account:",accounts);

      const adoptionInstance = await App.contracts.Adoption.deployed();
      window.adoptionlol = adoptionInstance;
      console.log(adoptionInstance);

      const isUserReg = await adoptionInstance.isRegistered(account);

      if(!isUserReg){
        alert("User Not yet registered. Please register first!!");
        return; 
      } else {
        try{
          const willStringVal = await adoptionInstance.getWill(account);
          console.log("Your Will",willStringVal);
          alert(`Your Will is ${willStringVal}`);
        } catch {
          alert("Error Occurred!");
        }
      }
    });  

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
