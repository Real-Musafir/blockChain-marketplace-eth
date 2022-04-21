import { Modal } from "@components/common";
import { CoureHero, Curriculum, Keypoints } from "@components/common/course";

export default function Course() {
  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <CoureHero />

      <Keypoints />

      <Curriculum />

      <Modal />
    </div>
  );
}
