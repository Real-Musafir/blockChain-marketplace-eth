import { Modal } from "@components/common";
import { CoureHero, Curriculum, Keypoints } from "@components/common/course";
import { BaseLayout } from "@components/common/layout";

export default function Course() {
  return (
    <BaseLayout>
      <div className="py-4">
        <CoureHero />
      </div>
      <Keypoints />
      <Curriculum />
      <Modal />
    </BaseLayout>
  );
}
