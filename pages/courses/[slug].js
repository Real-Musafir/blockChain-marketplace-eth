import { Modal } from "@components/common";
import { CoureHero, Curriculum, Keypoints } from "@components/course";
import { BaseLayout } from "@components/common/layout";

export default function Course() {
  return (
    <>
      <div className="py-4">
        <CoureHero />
      </div>
      <Keypoints />
      <Curriculum />
      <Modal />
    </>
  );
}

Course.Layout = BaseLayout;
