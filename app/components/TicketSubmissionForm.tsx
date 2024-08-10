'use client';

import { useRouter } from 'next/navigation';
import { formInputs } from '@/lib/formInputs';
import {
  handleFormSubmission,
  handleInputChange,
} from '@/lib/submissionFormHandlers';

export default function TicketSubmissionForm() {
  const router = useRouter();

  return (
    <div className='w-10/12 xl:w-2/4 bg-white py-6 rounded-2xl'>
      <form onSubmit={(event) => handleFormSubmission(event, router)}>
        <div className='w-4/5 mx-auto'>
          {formInputs.map((input, idx) => (
            <div key={idx} className='flex flex-col mb-4'>
              <label className='font-semibold'>{input.label}</label>
              {input.inputType === 'input' && (
                <input
                  id={input.label}
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  required={true}
                  className='border border-gray-200 rounded-md py-2'
                />
              )}
              {input.inputType === 'select' && input.option && (
                <select
                  id={input.label}
                  name={input.name}
                  required={true}
                  className='border border-gray-200 rounded-md py-2'
                  onChange={handleInputChange}
                >
                  {input.option.map((priority, idx) => (
                    <option key={idx}>{priority}</option>
                  ))}
                </select>
              )}
              {input.inputType === 'textarea' && (
                <textarea
                  id={input.label}
                  name={input.name}
                  placeholder={input.placeholder}
                  required={true}
                  className='border border-gray-200 rounded-md py-2'
                />
              )}
            </div>
          ))}
        </div>
        <div className='flex justify-center'>
          <button className='bg-blue-700 text-white font-semibold rounded-full w-32 py-2'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
