pragma solidity ^0.5.0;

contract UserRegistration {

    event Test (
      uint heart
    );

    struct User {
      address uid;
      uint lastHeartBeat;
      bool isDead;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner,"Not owner!!");
        _;
    }

    User[] public users;
    // uint balance = 0;
    address payable _owner;

    struct Will {
      uint id;
      string name;
      string ipfs_hash;
    }

    mapping (address => Will) addressWillMapping;

    constructor() public{
      _owner = msg.sender;
    }

    function setUser(address payable _user, uint randValue, uint value) public payable{
        require(msg.value == value, "Please send the required amt");
        uint id = users.push(User(_user, randValue, false));
        id++;
    }

    function retrieveBalance() external onlyOwner{
      msg.sender.transfer(address(this).balance);
    }

    function getBalance() public view returns(uint){
      return address(this).balance;
    }

    function isRegistered(address _user) public view returns(bool) {
      for(uint i = 0; i < users.length; ++i)
      {
        if(users[i].uid == _user)
        {
          return true;
        }
      }
      return false;
    }

    function addWill(string memory _name, string memory _ipfs_hash) public{
      uint id = 0;
      addressWillMapping[msg.sender] = Will(id, _name, _ipfs_hash);
    }

    // function getWill(address _user, uint _id) public view returns(string memory) {
    //   for(uint i = 0; i<addressWillMapping[_user].length; ++i) {
    //     if(addressWillMapping[_user][i].id == _id)
    //       return addressWillMapping[_user][i].ipfs_hash;
    //   }
    // }

    function giveHeartbeat(uint value) public{
      for(uint i = 0; i < users.length; ++i) {
        if(users[i].uid == msg.sender)
        {
          users[i].lastHeartBeat = value;
          break;
        }
      }
    }

    function checkDeath(uint value) public returns(string memory){
      uint duration = 20000;
        for(uint i = 0; i < users.length; ++i) {
          if(users[i].isDead == false && uint(users[i].lastHeartBeat + duration) < value)
          {
            users[i].isDead = true;
            return addressWillMapping[users[i].uid].ipfs_hash;
          }
      }
      return "";
    }

    function() external payable {}

}


