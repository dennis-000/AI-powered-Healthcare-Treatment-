import { IconCirclePlus } from '@tabler/icons-react';
import React, { useEffect, useState, useCallback } from 'react';
import RecordCard from './components/recordCard';
import CreateRecordModal from './components/CreateRecordModal';
import { usePrivy } from '@privy-io/react-auth';
import { useStateContext } from '../../context';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const { user } = usePrivy();
  const { records, fetchUserRecords, createRecord, fetchUserByEmail, currentUser } = useStateContext();

  // State to store user records
  const [userRecords, setUserRecords] = useState([]);

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch user data and records when the user changes
  useEffect(() => {
    if (user) {
      fetchUserByEmail(user.email.address);
      fetchUserRecords(user.email.address);
    }
  }, [user, fetchUserByEmail, fetchUserRecords]);

  // Store fetched records locally in state and localStorage
  useEffect(() => {
    setUserRecords(records);
    localStorage.setItem('userRecords', JSON.stringify(records));
  }, [records]);

  // Function to open the modal
  const handleOpenModal = () => setIsModalOpen(true);

  // Function to close the modal
  const handleCloseModal = () => setIsModalOpen(false);

  // Function to create a new record
  const createFolder = useCallback(async (foldername) => {
    try {
      const newRecordData = {
        userId: currentUser?.id,
        recordName: foldername,
        analysisResult: '',
        kanbanRecords: '',
        createdBy: user.email.address,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Attempt to create a new record
      const newRecord = await createRecord(newRecordData);

      if (newRecord) {
        fetchUserRecords(user.email.address); // Refresh records
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error creating record:', error);
      handleCloseModal();
    }
  }, [createRecord, fetchUserRecords, user.email.address, currentUser]);

  // Navigate to the record details page
  const handleNavigate = (name) => {
    const selectedRecord = userRecords.find((record) => record.recordName === name);

    if (selectedRecord) {
      navigate(`/medical-records/${name}`, { state: selectedRecord });
    }
  };

  return (
    <div className='flex flex-wrap gap-[26px]'>

      {/* Create Record Button */}
      <button
        type='button'
        className='mt-6 inline-flex items-center gap-x-2 rounded-full border border-neutral-700 
        bg-[#13131a] px-4 py-2 text-sm font-medium font-epilogue text-[16px] leading-[26px] text-white shadow-sm
        hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-600'
        onClick={handleOpenModal}
      >
        <IconCirclePlus />
        Create Record
      </button>

      {/* Modal for Creating a Record */}
      <CreateRecordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={createFolder}
      />

      {/* Records Grid */}
      <div className='grid w-full sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {/* Render Record Cards from the fetched records */}
        {userRecords.map((record) => (
          <RecordCard
            key={record.recordName}
            record={record}
            onNavigate={handleNavigate}
          />
        ))}
      </div>

    </div>
  );
};

export default Index;
