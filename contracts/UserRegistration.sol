pragma solidity ^0.5.0;

contract UserRegistration {

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

    function setUser(address _user) public{
        uint id = users.push(User(_user, uint(now)));
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

    function giveHeartbeat() public{
      for(uint i = 0; i < users.length; ++i) {
        if(users[i].uid == msg.sender)
        {
          users[i].lastHeartBeat = now;
          break;
        }
      }
    }

    function checkDeath() public view returns(bool){
      // uint duration = 60 seconds;
        for(uint i = 0; i < users.length; ++i) {
          if(uint(users[i].lastHeartBeat) < uint(now))
          {
            // return users[i].uid;
            return true;
          }
      }
      return false;
    }

}


