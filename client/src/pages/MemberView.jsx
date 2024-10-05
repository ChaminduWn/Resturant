import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const MemberView = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const componentRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/getusers?userId=${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data.users[0]);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUser();
  }, [userId]);

  const generateUserReport = () => {
    html2canvas(componentRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg'); // Default to JPEG

      // Adjust image properties
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('user_report.pdf');
    });
  };

  const navigateToDashboard = () => {
    window.location.href = '/dashboard?tab=users'; // Navigate using window.location.href
  };

  return (
    <>
    <div className="h-full bg-[#1f1f1f] dark:bg-gray-900">
      <div className="mx-auto" style={{ height: '700px' }}>
        <div className="flex justify-center h-full px-6 py-12">
          <div className="flex w-full h-full xl:w-3/4 lg:w-11/12">
            <div className="hidden bg-gray-400 rounded-l-lg dark:bg-gray-800 lg:block lg:w-5/12" style={{ backgroundImage: `url(${user && user.profilePicture})`, backgroundSize: 'cover', width: '200px', height: '200px' }}>
            </div>

            <div className="w-full p-5 bg-white rounded-lg lg:w-7/12 dark:bg-black lg:rounded-l-none" ref={componentRef}>
              <div className="text-black">
                <div className='text-center'> Member Information </div>
                {user ? (
                  <div>
                    <Label>Name:</Label>
                    <TextInput
                      type="text"
                      value={user.name}
                      readOnly
                    />

                    <Label>Username:</Label>
                    <TextInput
                      type="text"
                      value={user.username}
                      readOnly
                    />

                    <Label>Email:</Label>
                    <TextInput
                      type="email"
                      value={user.email}
                      readOnly
                      className="info-box"
                    />

                    <Label>Contact Number:</Label>
                    <TextInput
                      type="text"
                      value={user.contactNumber}
                      readOnly
                    />

                    <Label>Address:</Label>
                    <TextInput
                      type="text"
                      value={user.address}
                      readOnly
                    />

                    <Label>Date Of Birth:</Label>
                    <TextInput
                      type="text"
                      value={user.dateOfBirth && new Date(user.dateOfBirth).toISOString().split('T')[0]}
                      readOnly
                    />

                    <Label>Gender:</Label>
                    <TextInput
                      type="text"
                      value={user.gender}
                      readOnly
                    />
                  
                    {/* <div className="flex justify-center mt-4">
                      <Button onClick={generateUserReport}>Generate User Report</Button>
                    </div> */}

                    <div className="flex justify-center mt-4 ">
                      <Button onClick={navigateToDashboard}>Back</Button> {/* Modify Back button */}
                    </div>


                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MemberView;
