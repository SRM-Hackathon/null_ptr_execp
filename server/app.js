const contract = require('truffle-contract');

const metacoin_artifact = require('../build/contracts/UserRegistration.json');
var MetaCoin = contract(metacoin_artifact);
const Web3 = require('web3');
module.exports = {
  start: function(callback) {
    var self = this;
    this.web3  = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    // self.web3.eth.getAccounts(function(err, accs) {
    //   if (err != null) {
    //     console.log("There was an error fetching your accounts.", err);
    //     return;
    //   }

    //   if (accs.length == 0) {
    //     console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
    //     return;
    //   }
    //   self.accounts = accs;
    //   self.account = self.accounts[2];

    //   callback(self.accounts);
    // });

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.checkDeath.call();
    }).then(function(value) {
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
//   refreshBalance: function(account, callback) {
//     var self = this;

//     // Bootstrap the MetaCoin abstraction for Use.
//     MetaCoin.setProvider(self.web3.currentProvider);

//     var meta;
//     MetaCoin.deployed().then(function(instance) {
//       meta = instance;
//       return meta.getBalance.call(account, {from: account});
//     }).then(function(value) {
//         callback(value.valueOf());
//     }).catch(function(e) {
//         console.log(e);
//         callback("Error 404");
//     });
//   },
}