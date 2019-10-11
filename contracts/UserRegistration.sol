pragma solidity ^0.5.0;

contract UserRegistration {
    address[] public users;

    mapping (address => string) addressWillMapping;

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

    function addWill(string memory _will) public{
      addressWillMapping[msg.sender] = _will;
    }

    function getWill(address _user) public view returns(string memory) {
      return addressWillMapping[_user];
    }

}


