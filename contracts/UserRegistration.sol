pragma solidity ^0.5.0;

contract UserRegistration {

    event Test (
      uint heart
    );

    struct User {
      address uid;
      uint lastHeartBeat;
    }

    User[] public users;

    struct Will {
      uint id;
      string name;
      string ipfs_hash;
    }

    mapping (address => Will[]) addressWillMapping;

    function setUser(address _user, uint value) public{
        uint id = users.push(User(_user, value));
        id++;
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
      uint id = addressWillMapping[msg.sender].length;
      addressWillMapping[msg.sender].push(Will(id, _name, _ipfs_hash));
    }

    function getWill(address _user, uint _id) public view returns(string memory) {
      for(uint i = 0; i<addressWillMapping[_user].length; ++i) {
        if(addressWillMapping[_user][i].id == _id)
          return addressWillMapping[_user][i].ipfs_hash;
      }
    }

    function giveHeartbeat(uint value) public{
      for(uint i = 0; i < users.length; ++i) {
        if(users[i].uid == msg.sender)
        {
          users[i].lastHeartBeat = value;
          break;
        }
      }
    }

    function checkDeath(uint value) public returns(bool){
      // uint duration = 60 seconds;
        for(uint i = 0; i < users.length; ++i) {
          if(uint(users[i].lastHeartBeat + 15000) < value)
          {
            return true;
          }
      }
      return false;
    }

}


