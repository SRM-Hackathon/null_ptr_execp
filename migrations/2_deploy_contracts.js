var Adoption = artifacts.require("Adoption");
var UserRegistration = artifacts.require("UserRegistration");
module.exports = function(deployer) {
  deployer.deploy(Adoption);
  deployer.deploy(UserRegistration);
};
