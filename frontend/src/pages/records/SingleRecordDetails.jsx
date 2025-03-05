import { IconChevronRight, IconChevronUpRight, IconFileUpload, IconProgress } from '@tabler/icons-react'
import React from 'react'
import RecordDetailsHeader from './components/RecordDetailsHeader';
import { useLocation } from 'react-router-dom';
const SingleRecordDetails = () => {

  const { state } = useLocation();
  console.log(state);

  return (
    <div className='flex flex-wrap gap-[26px]'>
      <button
        type='button'
        // onClick={handleOpenModal}
        onClick={() => {}}
        className='mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 
        bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 
        disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white 
        dark:hover:bg-neutral-800'>
          <IconFileUpload/>#
          Upload Report
      </button>

      {/* File upload modal */}
      <RecordDetailsHeader recordName={state.recordName}/>



      <div className='w-full'>
        <div className='flex flex-col'>
          <div className='-m-1.5 overflow-x-auto'>
            <div className='inline-block min-w-full p-1.5 align-middle'>
              <div className='overflow-hidden rounded-xl border border-neutral-700 shadow-sm bg-[#13131a]'>
                <div className='border-b border-neutral-700 px-6 py-4'>
                    <h2 className='text-xl font-semibold text-neutral-700'>
                      Personalize AI-Driven Treatment Plan
                    </h2>
                    <p className='text-sm text-neutral-400'>
                      A tailored medical strategy leveraging advanced AI insights.
                    </p>
                </div>

                {/* Analyzed result */}
                <div className='flex w-full flex-col px-6 py-4 text-white'>
                  <div>
                    <h2 className='text-lg font-semibold text-white'>
                      Analyses Result
                    </h2>
                    {/* Actual treatment result coming from the db */}
                    <div className='space-y-2'>
                        {'rendering the results'}
                    </div>
                  </div>

                  <div className='mt-5 grid gap-2 sm:flex'>
                      <button
                      type='button'
                      onClick={() => {}}
                      className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white 
                      px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 
                      disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900
                      dark:text-white dark:hover:bg-neutral-800">
                          View Treatment Plan
                          <IconChevronRight size={20 }/>
                          {/* === To enhance user experience, so that they will see something is going on behind the scenes */}
                          { true&& <IconProgress size={10}
                          className=' mr-3 h-5 w-5 animate-spin'
                          />}
                      </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default SingleRecordDetails;