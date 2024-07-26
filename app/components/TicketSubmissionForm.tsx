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
    <div>
      <form>
        <div>
          {formInputs.map((input, idx) => (
            <div key={idx}>
              <label>{input.label}</label>
              {input.inputType === 'input' && (
                <input
                  id={input.label}
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  required={true}
                />
              )}
              {input.inputType === 'select' && input.option && (
                <select id={input.label} name={input.name} required={true}>
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
                />
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
