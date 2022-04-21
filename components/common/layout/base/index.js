import Footer from "@components/common/footer";
import Navbar from "@components/common/navbar";

export default function BaseLayout({ children }) {
  return (
    <>
      <div className=" max-w-7xl mx-auto px-4">
        <Navbar />
        <div className="fit">{children}</div>
      </div>
      <Footer />
    </>
  );
}
