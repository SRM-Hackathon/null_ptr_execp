pragma solidity ^0.5.0;

contract UserRegistration {
    address[] public users;

    // mapping (address => string) addressWillMapping;

    function setUser(address _user) public{
        uint id = users.push(_user);
        id++;
    }

    function getUsers() public view returns(address[] memory) {
		  return users;
    }


}


