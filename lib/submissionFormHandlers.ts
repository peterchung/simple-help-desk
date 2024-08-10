import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Handles the form submission when user clicks 'Submit' button
export const handleFormSubmission = async (
  event: React.FormEvent,
  router: ReturnType<typeof useRouter>
) => {
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

    router.refresh();
  } catch (err) {
    console.error('Error submitting ticket', err);
  }
};

// Handles the selection change when a user goes from 'Select priority' to a valid option
export const handleInputChange = (
  event: React.ChangeEvent<HTMLSelectElement>
) => {
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
