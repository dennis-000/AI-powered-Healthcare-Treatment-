import { IconCirclePlus } from '@tabler/icons-react'
import React, {useEffect, useState} from 'react'
import RecordCard from './components/recordCard'
import CreateRecordModal from './components/CreateRecordModal'
import { usePrivy } from '@privy-io/react-auth'
import { useStateContext } from '../../context'
import { useNavigate } from 'react-router-dom'

const MedicalRecords = () => {

  const navigate = useNavigate()

  const { user } = usePrivy()

  const {records, fetchUserRecords, createRecord, fetchUserByEmail, currentUser} = useStateContext()

  // state to manage user records
  const [userRecords, setUserRecords] = useState([])
  // state to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user){
      fetchUserByEmail(user.email.address);
      fetchUserRecords(user.email.address);
    }
  }, [user, fetchUserByEmail, fetchUserRecords])

  // Store the records locally
  useEffect(() => {
    setUserRecords(records)
    localStorage.setItem('userRecords', JSON.stringify(records))
  }, [records])

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }
  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  // Function to create a new record
  const createFolder = async (foldername) => {
    try {
      if (currentUser) {
        const newRecord = await createRecord({
          userId: currentUser.id,
          recordName: foldername,
          symptoms: '',
          reportUrl: '',
          createdBy: user.email.address,
        });
        
        if (newRecord){
          fetchUserRecords(user.email.address);
          handleCloseModal();
        }
      } else {
        console.error('Current user not found');
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error creating record', error);
      handleCloseModal();
    } 
  };

  // Navigate to the record details page
  const handleNavigate = (name) => {
    const filteredRecords = userRecords.filter((record) => 
      (record.recordName === name) || (record.name === name)
    )
    navigate(`/medical-records/${name}`, {
      state: filteredRecords[0]
    })
  }

  return (
    <div className='flex flex-wrap gap-[26px]'>

        <button
        type='button'
        className='mt-6 inline-flex items-center gap-x-2 rounded-full border border-neutral-700 
        bg-[#13131a] px-4 py-2 text-sm font-medium font-epilogue text-[16px] leading-[26px] text-white shadow-sm
        hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-600'
        onClick={handleOpenModal}
        >
            <IconCirclePlus/>
            Create Record
        </button>

        {/* Modal */}
        <CreateRecordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={createFolder}
        />

        {/* Record Card */}
        <div className='grid w-full sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {/* Loop through what ever is coming from the db and this them in the card */}
          {userRecords.map((record, index) => (
            // Record Card Component
            <RecordCard
            key={record.recordName || record.name || index}
            record={record}
            onNavigate={handleNavigate}
            />
          ))}
        </div>

    </div>
  )
}

export default MedicalRecords;