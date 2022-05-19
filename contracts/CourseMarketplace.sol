// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {

    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        uint id; //32
        uint price; //32
        bytes32 proof; //32
        address owner; //20
        State state; //1
    }

    function purchaseCourse(
            bytes16 courseId,
            bytes32 proof
            ) 
            external
            payable
            returns(bytes32) 
            {
                bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
                return courseHash;
            }

}