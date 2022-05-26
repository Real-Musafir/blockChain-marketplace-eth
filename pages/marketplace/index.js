import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { OrderModal } from "@components/ui/order";
import { getAllCourse } from "@content/courses/fetcher";
import { useState } from "react";

export default function Marketplace({ courses }) {
  const { web3 } = useWeb3();
  const { canPurchaseCourse, account } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const purchaseCourse = (order) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);

    console.log(hexCourseId);

    const orderHash = web3.utils.soliditySha3(
      { type: "bytes", value: hexCourseId },
      { type: "address", value: account.data }
    );

    console.log(orderHash);

    const emailHash = web3.utils.sha3(order.email);

    console.log(emailHash);

    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    );

    console.log(proof);
  };

  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            disabled={!canPurchaseCourse}
            course={course}
            Footer={() => (
              <div className="mt-4">
                <Button
                  onClick={() => setSelectedCourse(course)}
                  variant="lightPurple"
                  disabled={!canPurchaseCourse}
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onSubmit={purchaseCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
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

Marketplace.Layout = BaseLayout;
