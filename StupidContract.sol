pragma solidity ^0.4.20;

contract StupidContract {
    
    string[] public stupidStuff;
    
    function addStupid(string memory stupidThing) public
    {
        stupidStuff.push(stupidThing);
    }
    
    function countStupid() public view returns (uint count)
    {
        return stupidStuff.length;
    }
}
