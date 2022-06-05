import { useAccount, useOwnedCourse } from "@components/hooks/web3";
import { Message, Modal } from "@components/ui/common";
import { CoureHero, Curriculum, Keypoints } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourse } from "@content/courses/fetcher";

export default function Course({ course }) {
  const { account } = useAccount();

  const { ownedCourse } = useOwnedCourse(course, account.data);
  const courseState = ownedCourse.data?.state;

  return (
    <>
      <div className="py-4">
        <CoureHero
          hasOwner={!!ownedCourse.data}
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <Keypoints points={course.wsl} />
      {courseState && (
        <div className="max-w-5xl mx-auto">
          {courseState === "purchased" && (
            <Message>
              Course is purchased and waiting for the activation, Process can
              take up to 24 hours.
              <i className="block font-normal">
                In case of any question, please contact info@company.com
              </i>
            </Message>
          )}
          {courseState === "activated" && (
            <Message>Shahdath wishes happy watching.</Message>
          )}
          {courseState === "deactivated" && (
            <Message>
              Course has been deactivated, due to incorrect purchases data
              <i className="block font-normal">
                In case of any question, please contact info@company.com
              </i>
            </Message>
          )}
        </div>
      )}

      <Curriculum locked={true} />
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
