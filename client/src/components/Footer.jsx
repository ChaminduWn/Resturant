import { Footer as FlowbiteFooter } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function Footer() {
  return (
    <FlowbiteFooter container className='bg-[#b98192] border border-t-8 border-gray-500'>
      <div className='w-full mx-auto max-w-7xl'>
        <div className='grid justify-between w-full sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center text-lg font-semibold whitespace-nowrap sm:text-xl dark:text-white'
            >
              <span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
              </span>
              Food and Restaurant
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-33 sm:gap-20'>
            <div>
              <FlowbiteFooter.Title title='About' />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link
                  href='https://www.100jsprojects.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Feedback
                </FlowbiteFooter.Link>
                <FlowbiteFooter.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Food and Restaurant
                </FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
            <div>
              <FlowbiteFooter.Title title='Legal' />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link href='#'>Privacy Policy</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href='#'>Terms &amp; Conditions</FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
          </div>
        </div>
        <FlowbiteFooter.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <FlowbiteFooter.Copyright
            href='#'
            by="Food and Restaurant"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-10 mt-4 sm:mt-0 sm:justify-center sm:mr-55">
            <FlowbiteFooter.LinkGroup col>
              <FlowbiteFooter.Link href='#' > FOLLOW US - </FlowbiteFooter.Link>
            </FlowbiteFooter.LinkGroup>
            <FlowbiteFooter.Icon href='#' icon={BsFacebook}/>
            <FlowbiteFooter.Icon href='#' icon={BsInstagram}/>
            <FlowbiteFooter.Icon href='#' icon={BsTwitter}/>
          </div>
        </div>
      </div>
    </FlowbiteFooter>
  );
}
