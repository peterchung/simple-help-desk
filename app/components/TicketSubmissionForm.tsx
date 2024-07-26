'use client';

import axios from 'axios';
import { toast } from 'sonner';

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
  const handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const name = form.elements.namedItem('name') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const subject = form.elements.namedItem('subject') as HTMLInputElement;
    const priority = form.elements.namedItem('priority') as HTMLSelectElement;
    const description = form.elements.namedItem(
      'description'
    ) as HTMLTextAreaElement;

    // Check to ensure a valid priority has been selected
    if (priority.value === 'Select priority...') {
      priority.setCustomValidity('Please select a valid priority');
      priority.reportValidity();
      return;
    } else {
      priority.setCustomValidity('');
    }

    const isValid = form.reportValidity();
    if (!isValid) {
      console.log('Form is invalid.');
      return;
    }

    const formValues = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      priority: priority.value,
      description: description.value,
    };

    try {
      await axios.post('api', formValues);

      form.reset();

      toast.success(
        'We have received your ticket! A help desk member will be in contact soon.'
      );
    } catch (err) {
      console.error('Error submitting ticket', err);
    }
  };

  // Handles the selection change when a user goes from 'Select priority' to a valid option
  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const input = event.target;

    if (input.validity.valid) {
      input.setCustomValidity('');
    }

    if (input.name === 'priority' && input.value !== 'Select priority...') {
      input.setCustomValidity('');
    } else {
      input.setCustomValidity('Please select a valid priority');
    }
  };

  return (
    <div className='w-1/3 bg-white py-6 rounded-2xl'>
      <form onSubmit={handleFormSubmission}>
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
