export const formInputs = [
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
