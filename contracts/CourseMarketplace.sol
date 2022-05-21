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

    //maping of courseHash to Course data
    mapping(bytes32 => Course) private ownedCourses;

    // mapping of courseID to courseHash
    mapping(uint=>bytes32) private ownedCoursHash;

    // number of all courses + id of the course
    uint private totalOwnedCourses;

    function purchaseCourse(
            bytes16 courseId,
            bytes32 proof
            ) 
            external
            payable
            {
                bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
                uint id = totalOwnedCourses++;
                ownedCoursHash[id] = courseHash;
                ownedCourses[courseHash] = Course({
                    id: id,
                    price: msg.value,
                    proof: proof,
                    owner: msg.sender,
                    state: State.Purchased
                });
            }

}