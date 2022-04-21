import { Hero } from "@components/common";
import { CourseList } from "@components/common/course";
import { BaseLayout } from "@components/common/layout";
import { getAllCourse } from "@content/courses/fetcher";

export default function Home({ courses }) {
  return (
    <>
      <Hero />
      {JSON.stringify(courses)}
      <CourseList />
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

{
  /* <Breadcrumbs />
      <WalletBar />
      <EthRates />
      <OrderCard /> */
}
