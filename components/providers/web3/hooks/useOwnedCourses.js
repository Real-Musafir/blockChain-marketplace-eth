import useSWR from "swr";

export const handler = (web3, contract) => (courses, account) => {
  const swrRes = useSWR(
    () => ((web3 && contract, account) ? "web3/ownedCourses" : null),
    async () => {
      const ownedCourses = [];
      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];

        // if (!course.id) {
        //   continue;
        // }
        ownedCourses.push(course.owned);

        // const hexCourseId = web3.utils.asciiToHex(course.id);
        // const courseHash = web3.utils.soliditySha3(
        //   { type: "bytes16", value: hexCourseId },
        //   { type: "address", value: account }
        // );

        // const ownedCourse = await contract.methods
        //   .getCourseByHash(courseHash)
        //   .call(); //when we calling a getter function the use call() it has no gas

        // if (ownedCourse.owned != "0x0000000000000000000000000000000000000000") {
        //   ownedCourse.push(ownedCourse);
        // }
      }
      return ownedCourses;
    }
  );
  return swrRes;
};
