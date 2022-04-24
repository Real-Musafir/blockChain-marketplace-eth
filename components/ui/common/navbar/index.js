import { useWeb3 } from "@components/providers";
import Link from "next/link";
import { Button } from "@components/ui/common";
import { useRouter } from "next/router";

export default function Navbar() {
  const { connect, isLoading, isWeb3Loaded } = useWeb3();
  const router = useRouter();
  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </Link>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </Link>
            </div>
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </Link>
              {isLoading ? (
                <Button disabled={true} onClick={connect} href="#">
                  Loading...
                </Button>
              ) : isWeb3Loaded ? (
                <Button onClick={connect} href="#">
                  Connect
                </Button>
              ) : (
                <Button
                  onClick={() => window.open("https://metamask.io/", "_blank")}
                  href="#"
                  className="px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Install Metamask
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
