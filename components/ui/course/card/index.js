import Image from "next/image";
import Link from "next/link";

export default function Card({ course, disabled, Footer, state }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex h-full">
        <div className="flex-1 h-full next-image-wrapper">
          <Image
            className={`object-cover ${disabled && "filter grayscale"}`}
            src={course.coverImage}
            layout="responsive"
            width="200"
            height="230"
            alt={course.title}
          />
        </div>
        <div className="p-8 pb-4 flex-2">
          <div className="flex item-center">
            <div className="uppercase mr-2 tracking-wide text-sm text-indigo-500 font-semibold">
              {course.type}
            </div>
            <div>
              {state === "activated" && (
                <div className="text-xs text-black bg-green-200 p-1 px-3 rounded-full">
                  Activate
                </div>
              )}
              {state === "deactivated" && (
                <div className="text-xs text-black bg-red-200 p-1 px-3 rounded-full">
                  Deactivated
                </div>
              )}

              {state === "purchased" && (
                <div className="text-xs text-black bg-yellow-200 p-1 px-3 rounded-full">
                  Pending
                </div>
              )}
            </div>
          </div>
          <Link href={`/courses/${course.slug}`}>
            <a className=" h-12 block mt-1 text-sm xs:text-lg leading-tight font-medium text-black hover:underline">
              {course.title}
            </a>
          </Link>
          <p className="mt-2  text-sm sm:text-base text-gray-500">
            {course.description.substring(0, 70)}...
          </p>

          {Footer && <Footer />}
        </div>
      </div>
    </div>
  );
}
