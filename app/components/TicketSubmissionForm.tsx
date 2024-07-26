'use client';

const formInputs = [
  {
    inputType: 'input',
    label: 'Name',
    type: 'text',
    placeholder: 'John Doe',
    name: 'name',
  },
  {
    inputType: 'input',
    label: 'Email',
    type: 'email',
    placeholder: 'example@example.com',
    name: 'email',
  },
  {
    inputType: 'input',
    label: 'Subject',
    type: 'text',
    placeholder: 'Subjet',
    name: 'subject',
  },
  {
    inputType: 'select',
    label: 'Priority',
    option: ['Select priority...', 'Low', 'Med', 'High'],
    name: 'priority',
  },
  {
    inputType: 'textarea',
    label: 'Description of problem',
    placeholder: 'Please describe your issue here...',
    name: 'description',
  },
];

export default function TicketSubmissionForm() {
  return (
    <div className='w-1/3 bg-white py-6 rounded-2xl'>
      <form>
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
