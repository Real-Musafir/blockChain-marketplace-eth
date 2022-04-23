import { Hero } from "@components/ui/common";
import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourse } from "@content/courses/fetcher";
import { useWeb3 } from "@components/providers";

export default function Home({ courses }) {
  const { test } = useWeb3();
  return (
    <>
      {test}
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
