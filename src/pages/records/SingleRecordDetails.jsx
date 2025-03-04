import { IconChevronRight, IconChevronUpRight, IconFileUpload, IconProgress } from '@tabler/icons-react'
import React from 'react'
import RecordDetailsHeader from './components/RecordDetailsHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import FileUploadModal from './components/FileUploadModal';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { useStateContext } from '../../context';
import Markdown from 'react-markdown';

// Import the Google Generative AI library
// import env variable from VITE
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

const SingleRecordDetails = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const {file, setFile} = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  // This state is going to track the processes of Ai analyses
  const [processing, setProcessing] = useState(false);
  
  // State to store analysis results
  const [analysisResult, setAnalysisResult] = useState(
    state.analysisResults || '',
  );
  // console.log(state);

  const [filename, setFilename] = useState('');
  const [filetype, setFiletype] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // once the Ai generates the results, we need to update the record
  // So we have to destruct the update record that was created
  const {updateRecord} = useStateContext();

  // Function to open and close the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle file change when file is uploaded
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file.type);
    setFilename(file.name);
    setFile(file)
  };

  // GEMINI API
  // Function to read the file as a base64 encoded string
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split('\n')[1]);
    reader.onerror = reject
    reader.readAsDataURL(file);
  })}

  // function to handle the handle the file upload
  // This function uses GEMINI API to upload the file and update the record in the database
  // Once the file is uploaded, we are going to trigger the Ai analysis
  // After the Ai analysis is done, we will update the record with the analysis results
  // This is a placeholder function, you need to replace it with your actual implementation
  // const handleFileUpload = async () => {
  //   // TODO: Implement file upload to GEMINI API and update the record
  // }
  // As soon as the user uploads a file, it sends a prompt to the Gemini Ai and analyze the file and return the results
  const handleFileUpload = async () => {
    setUploading(true);
    // const base64String = await readFileAsBase64(file);
    // console.log(base64String);
    // setUploading(false);
    setUploadSuccess(false);

    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(geminiApiKey);

    try {
      const base64Data = await readFileAsBase64(file);

      // image or document part
      const imageParts = [
        {
          inlineData: base64Data,
            data: base64Data,
            mimetype: filetype,
          },
        
      ];
      
      const model = genAI.getGenerativeModel({model: 'gemini-pro'});

      // prompt to the AI
      const prompt = `You are an expert medical AI assistant specializing in analyzing medical reports, 
      diagnosing diseases, and generating personalized treatment recommendations based on existing 
      healthcare guidelines, research, and patient data. Your primary goal is to provide accurate, detailed, 
      and easy-to-understand explanations and treatment plans for patients.`;

      // Hold the results
      const results = await model.generateContent([prompt, ...imageParts]);

      // Once the results are generated 
      const response = await results.response;
      // Get the text from the response
      const text = await response.text();
      // console.log(text);

      // Update the record with the analysis results
      setAnalysisResult(text);
      // Update the record with the analysis results
      const updateRecord = await updateRecord({
        documentsID: state.id,
        analysisResult: text,
        kanbanRecords: '',
      })
      // update some state
      setUploadSuccess(true);
      setIsModalOpen(false); 
      setFilename('');
      setFiletype('');
      setFile(null);

    } catch (error) {
      console.error('Error uploading file' ,error);
      setUploadSuccess(false);
      setIsModalOpen(false);
    } finally {
      setUploading(false);
    }
  }

  // Process treatment function
  const processTreatmentPlan = async () => {
    setProcessing(true);

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({model: 'gemini-pro'});

    const prompt =`
You are Nkosuo Health AI, a trusted digital healthcare assistant designed to help Africans access quality healthcare, understand treatment processes, and track their progress effortlessly. Your goal is to bridge healthcare gaps in Ghana and Africa by providing clear, structured, and personalized medical guidance.

Your Role & Goal:
Your task is to analyze the treatment plan from the provided medical report ${analysisResult} and structure it into an easy-to-follow, interactive Kanban-style health recovery plan that will help patients
with the following columns::
 1. Todo – Actions to take before treatment starts (Preparation)
 2. Diagnosis & Tests – Ongoing medical tests and assessments
 3. Treatment in Progress – Active treatment steps
 4. Follow-up & Recovery – Post-treatment care and monitoring
 5. Done – Successfully completed tasks

Key Responsibilities:
 Simplify complex medical instructions into easy, understandable steps for people from diverse backgrounds, including those with little medical knowledge.
 Ensure that every treatment plan aligns with local healthcare realities, considering factors like hospital availability, affordability, and traditional health approaches.
 Encourage patient participation by making the treatment process more engaging, motivating, and goal-oriented.
 Help users track progress in real-time and make informed health decisions.
 Promote preventive healthcare by suggesting additional actions that could improve overall well-being beyond the immediate treatment plan.

Please provide the results in the following  format for easy front-end display no quotation or what so ever just pure the structure below:
{
  "columns": [
    { "id": "todo", "title": "Preparation Before Treatment" },
    { "id": "diagnosis", "title": "Diagnosis & Tests" },
    { "id": "treatment", "title": "Treatment in Progress" },
    { "id": "followup", "title": "Follow-up & Recovery" },
    { "id": "done", "title": "Completed Milestones" }
  ],
  "tasks": [
    { "id": "1", "columnId": "todo", "content": "Book a hospital or clinic appointment" },
    { "id": "2", "columnId": "diagnosis", "content": "Get an MRI or CT scan" },
    { "id": "3", "columnId": "treatment", "content": "Take prescribed medications daily" },
    { "id": "4", "columnId": "followup", "content": "Attend scheduled follow-up appointments" },
    { "id": "5", "columnId": "done", "content": "Successfully completed first treatment session" }
  ]
}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Pass the response test as a JSON
    const parsedResponse = JSON.parse(text);

    // Update the record with the generated kanban board data
    const updatedRecord = await model.updateRecord({
      documentsID: state.id,
      kanbanRecords: text,
    })

    // Navigate to the screening schedule page with the parse response data
    navigate(`/screening-schedules`, {
      state: parsedResponse,  
    });

    // close the spinner
    setProcessing(false);

    // Generative Ai initialize here from the google ai and have a have prompt to generate it object of arrays
    // that will be easy to handle in the kanban board
     
  };

  return (
    <div className='flex flex-wrap gap-[26px]'>
      <button
        type='button'
        onClick={handleOpenModal}
        // onClick={() => {}}
        className='mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 
        bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 
        disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white 
        dark:hover:bg-neutral-800'>
          {/* <IconFileUpload/> */}
          Upload Report
      </button>

      {/* File upload modal */}
      <FileUploadModal

      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onFileChange={handleFileChange}
      onFileUpload={handleFileUpload}
      upLoading={uploading}
      uploadSuccess={uploadSuccess}
      filename={filename}
      />
      {/* Record Details Header */}
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

                {/* Analyzed results */}
                <div className='flex w-full flex-col px-6 py-4 text-white'>
                  <div>
                    <h2 className='text-lg font-semibold text-white'>
                      Analysis Result
                    </h2>
                    {/* Actual treatment result coming from the db */}
                    <div className='space-y-2'>
                        <ReactMarkdown>{analysisResult}</ReactMarkdown>
                    </div>
                  </div>

                  <div className='mt-5 grid gap-2 sm:flex'>
                      <button
                      type='button'
                      onClick={processTreatmentPlan}
                      className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white 
                      px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 
                      disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900
                      dark:text-white dark:hover:bg-neutral-800">
                          View Treatment Plan
                          <IconChevronRight size={20 }/>
                          {/* === To enhance user experience, so that they will see something is going on behind the scenes */}
                          { processing && <IconProgress size={10}
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