import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { useOwnedCourses, useWalletInfo } from "@components/hooks/web3";
import { Button, Message } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";

export default function Marketplace({ courses }) {
  const { web3, contract, requireInstall } = useWeb3();
  const { hasConnectedWallet, isConnecting, account } = useWalletInfo();
  const { ownedCourses } = useOwnedCourses(courses, account.data);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const purchaseCourse = async (order) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    );
    const emailHash = web3.utils.sha3(order.email);
    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    );

    const value = web3.utils.toWei(String(order.price));

    try {
      const result = await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({ from: account.data, value });
      console.log(result);
    } catch {
      console.error("Purchase course: Operation has failed.");
    }
  };

  return (
    <>
      <MarketHeader />
      <CourseList courses={courses}>
        {(course) => {
          const owned = ownedCourses.lookup[course.id];
          return (
            <CourseCard
              key={course.id}
              course={course}
              state={owned?.state}
              disabled={!hasConnectedWallet}
              Footer={() => {
                if (requireInstall) {
                  return (
                    <div className="mt-4">
                      <Button disabled={true} variant="lightPurple">
                        Install
                      </Button>
                    </div>
                  );
                }

                if (isConnecting) {
                  return (
                    <div className="mt-4">
                      <Button disabled={true} variant="lightPurple">
                        Loading...
                      </Button>
                    </div>
                  );
                }

                if (!ownedCourses.hasInitialResponse) {
                  return (
                    <div className="mt-4">
                      <Button disabled={true} variant="lightPurple">
                        Loading State
                      </Button>
                    </div>
                  );
                }

                if (owned) {
                  return (
                    <div className="mt-4">
                      <div>
                        <Button disabled={true} variant="green">
                          Ownded
                        </Button>
                        {owned.state === "deactivated" && (
                          <Button
                            onClick={() => alert("Re-activating")}
                            variant="purple"
                          >
                            Fund to Activate
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="mt-4">
                    <Button
                      onClick={() => setSelectedCourse(course)}
                      disabled={!hasConnectedWallet}
                      variant="lightPurple"
                    >
                      Purchase
                    </Button>
                  </div>
                );
              }}
            />
          );
        }}
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
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
