import { Modal } from "@components/common";
import { CoureHero, Curriculum, Keypoints } from "@components/course";
import { BaseLayout } from "@components/common/layout";
import { getAllCourse } from "@content/courses/fetcher";

export default function Course({ course }) {
  return (
    <>
      {course.title}
      <div className="py-4">
        <CoureHero />
      </div>
      <Keypoints />
      <Curriculum />
      <Modal />
    </>
  );
}

export function getStaticPaths() {
  const { data } = getAllCourse();

  return {
    paths: data.map((c) => ({
      params: {
        slug: c.slug,
      },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { data } = getAllCourse();
  const course = data.filter((c) => c.slug === params.slug)[0];
  return {
    props: {
      course,
    },
  };
}

Course.Layout = BaseLayout;
