pragma solidity ^0.5.0;

contract UserRegistration {
    address[] public users;

    struct Will {
      uint id;
      string name;
      string ipfs_hash;
    }

    mapping (address => Will[]) addressWillMapping;

    function setUser(address _user) public{
        uint id = users.push(_user);
        id++;
    }

    function getUsers() public view returns(address[] memory) {
		  return users;
    }

    function isRegistered(address _user) public view returns(bool) {
      for(uint i = 0; i < users.length; ++i)
      {
        if(users[i] == _user)
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

}


