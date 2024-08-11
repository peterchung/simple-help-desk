import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const getTicketModalData = async (ticketId: number) => {
  try {
    const response = await axios.get('/api', { params: { ticketId } });

    return response.data;
  } catch (err) {
    console.error('Error loading ticket data', err);

    return null;
  }
};

// Handles updating ticket data
// Uses router.refresh() to update the stale data on the
// Admin server component page
export const handleFormUpdate = async (
  event: React.FormEvent,
  ticketId: number,
  setTicketData: any,
  setCurrentResponse: (response: string) => void,
  onDismiss: () => void,
  router: ReturnType<typeof useRouter>
) => {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const status = form.elements.namedItem('status') as HTMLSelectElement;
  const response = form.elements.namedItem('response') as HTMLTextAreaElement;

  const isValidForm = form.reportValidity();

  if (!isValidForm) {
    console.log('invalid form');
    return;
  }

  const newFormValues = {
    status: status.value,
    ticketId,
    lastModified: new Date(),
    lastResponse: response.value,
  };

  try {
    await axios.put('api', newFormValues);

    setTicketData((prevTicketData: any) => ({
      ...prevTicketData,
      ...newFormValues,
    }));

    setCurrentResponse('');

    toast.success('Ticket has been updated');

    router.refresh();
    onDismiss();
  } catch (err) {
    console.error('Error updating ticket', err);
  }
};
