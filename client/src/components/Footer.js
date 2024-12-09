import { Footer as FlowbiteFooter } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function Footer() {
  return (
    <FlowbiteFooter container className="text-white bg-gradient-to-r from-[#AC5180] to-[#160121]">
      <div className="w-full max-w-screen-xl p-4 py-6 mx-auto lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Food and Restaurant
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">About</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <a
                    href="https://www.100jsprojects.com"
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Feedback
                  </a>
                </li>
                <li>
                  <Link to="/about" className="hover:underline">
                    Food and Restaurant
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Follow Us</h2>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="hover:text-white">
                    <BsFacebook className="w-4 h-4" />
                    <span className="sr-only">Facebook page</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    <BsInstagram className="w-4 h-4" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    <BsTwitter className="w-4 h-4" />
                    <span className="sr-only">Twitter page</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <span className="text-sm">
            © {new Date().getFullYear()} Food and Restaurant. All Rights Reserved.
          </span>
        </div>
      </div>
    </FlowbiteFooter>
  );
}
