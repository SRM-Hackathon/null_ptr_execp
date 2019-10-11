pragma solidity ^0.5.0;

contract UserRegistration {
    address[] public users;

    // mapping (address => string) addressWillMapping;

    function setUser(address _user) external{
        uint id = users.push(_user);
        id++;
    }

    function getUsers() external returns(address[] memory) {
		return users;
    }


}


