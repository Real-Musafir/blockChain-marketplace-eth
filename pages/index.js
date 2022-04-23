import { Hero } from "@components/ui/common";
import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourse } from "@content/courses/fetcher";
import { useWeb3 } from "@components/providers";

export default function Home({ courses }) {
  const { web3, isInitialized } = useWeb3();
  console.log(web3);
  return (
    <>
      {isInitialized ? "Is Init" : "Is not Init"}
      <Hero />
      <CourseList courses={courses} />
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourse();
  return {
    props: {
      courses: data,
    },
  };
}

Home.Layout = BaseLayout;
