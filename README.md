// function stake() public payable {
// require(isStaker[msg.sender], "You are allowed to stake once until deposit Timestamp");

// if (msg.value != threshold) {
// revert("Stake amount is too small ");
// }

// balances[msg.sender] = msg.value;
// isStaker[msg.sender] = true;
// depositTimestamps[msg.sender] = block.timestamp;
// stakersAddressArray.push(msg.sender);
// if (depositTimestamps[msg.sender] < withdrawalDeadline) {
// isStaker[msg.sender] = false;
// }
// }

// function remove(uint \_index) internal returns (uint[] storage) {
// if (\_index >= stakersAddressArray.length) return new uint[](0);

// for (uint i = \_index; i < stakersAddressArray.length - 1; i++) {
// stakersAddressArray[i] = stakersAddressArray[i + 1];
// }
// delete stakersAddressArray[stakersAddressArray.length - 1];
// stakersAddressArray.length--;
// return stakersAddressArray;
// }

// function payInterest() {}
