const contract = require('truffle-contract');
const retrieveFile = require('./ipfs');
const metacoin_artifact = require('../build/contracts/UserRegistration.json');
var MetaCoin = contract(metacoin_artifact);
const Web3 = require('web3');

let hash = [];

async function checkDeath () {
    var self = this;
    this.web3  = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    MetaCoin.setProvider(self.web3.currentProvider);

    // var meta;
    // MetaCoin.deployed().then(function(instance) {
    //   meta = instance;
    //   return meta.checkDeath.call(Date.now());
    // }).then(function(value) {
      
    //   if(value) {
    //     if(hash.indexOf(value) == -1){
    //       console.log(value);
    //       hash.push(value);
    //       retrieveFile("Aditya.pdf",value)}
    //     }
    // }).catch(function(e) {
    //     console.log(e);
    // });

    let MetaCoinInstance = await MetaCoin.deployed();
    let hashValue = await MetaCoinInstance.checkDeath.call(Date.now());
    if(hashValue) {
      if(hash.indexOf(hashValue) == -1){
        console.log(hashValue);
        hash.push(hashValue);
        retrieveFile("Aditya.pdf",hashValue);
      }
    }
  }

  function intervalFunc() {
    checkDeath();
  }
    setInterval(intervalFunc,1500)