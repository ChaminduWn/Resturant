import { Link } from 'react-router-dom';

export default function EmployeeCard({ employee }) {
    return (
        <div className='group relative w-full border border-[#1f1f1f] hover:border-2 h-[350px] overflow-hidden rounded-lg sm:w-[350px] transition-all justify-center mx-auto'>
          <Link to={`/view-employee-details/${employee._id}`}>
            <img
              src={employee.profilePicture}
              alt='post cover'
              className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
            />
          </Link>
          <div className='flex flex-col gap-2 p-3'>
            <p className='text-lg font-semibold line-clamp-2'>{employee.firstname} {employee.lastname}</p>
            <span className='text-sm italic'>{employee.role}</span>
            <Link
              to={`/view-employee-details/${employee._id}`}
              className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-[#1f1f1f] text-[#1f1f1f] hover:bg-[#1f1f1f] hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
            >
              View
            </Link>
          </div>
        </div>
      );
}