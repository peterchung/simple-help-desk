'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  TicketResponseType,
  TicketItem,
  ModalResponseFormProps,
} from '@/lib/types';

// interface TicketResponseType {
//   ticketId: number;
//   requestedBy: string;
//   email: string;
//   priority: string;
//   dateCreated: Date;
//   lastModified: Date;
//   subject: string;
//   issueDescription: string;
//   status: string;
//   lastResponse: string;
// }

// interface TicketItem {
//   ticketId: number;
//   priority: string;
//   status: string;
//   requestedBy: string;
//   email: string;
//   subject: string;
//   dateCreated: Date;
// }

// interface ModalResponseFormProps {
//   isOpen: boolean;
//   onDismiss: () => void;
//   ticket: TicketItem;
// }

const formLabels = {
  requestedBy: 'Requested by:',
  email: 'Email:',
  priority: 'Priority:',
  dateCreated: 'Date Created:',
  lastModified: 'Last Modified:',
  subject: 'Subject:',
  issueDescription: 'Issue description:',
  status: 'Status:',
  lastResponse: 'Last response:',
  currentResponse: 'Response:',
};

export default function ModalResponseForm({
  isOpen,
  onDismiss,
  ticket,
}: ModalResponseFormProps) {
  const [ticketData, setTicketData] = useState<TicketResponseType | null>(null);
  const [status, setStatus] = useState('');
  const [currentResponse, setCurrentResponse] = useState('');
  const router = useRouter();

  // Retrieve ticket data and set states on initial render and when isOpen
  // or ticket changes
  useEffect(() => {
    const loadModalData = async () => {
      const data = await getTicketModalData(ticket.ticketId);
      setTicketData(data);
      setStatus(data?.status || '');
    };

    if (ticket.ticketId) loadModalData();
  }, [isOpen, ticket]);

  const getTicketModalData = async (ticketId: number) => {
    try {
      const response = await axios.get('/api', { params: { ticketId } });

      return response.data;
    } catch (err) {
      console.error('Error loading ticket data', err);

      return null;
    }
  };

  // Ensures modal should be open
  if (!isOpen) return null;

  // Renders all ticket data and proper input types in modal
  const renderModalData = () => {
    if (!ticketData) return null;

    return Object.entries(formLabels).map(([property, label]) => {
      const inputValue = ticketData[property as keyof TicketResponseType];

      return (
        <div key={property} className='mb-4'>
          <label className='text-black font-bold'>{label}</label>
          {property === 'status' ? (
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              name='status'
              required={true}
              className='border rounded w-full shadow text-black py-2'
            >
              <option value='New'>New</option>
              <option value='In progress'>In progress</option>
              <option value='Resolved'>Resolved</option>
            </select>
          ) : property === 'currentResponse' ? (
            <textarea
              value={currentResponse}
              onChange={(event) => setCurrentResponse(event.target.value)}
              name='response'
              rows={3}
              className='border rounded w-full shadow text-black'
            />
          ) : (
            <div className='text-black'>
              {property === 'dateCreated' || property === 'lastModified'
                ? new Date(inputValue).toLocaleDateString('en-US', {
                    timeZone: 'UTC',
                  })
                : String(inputValue)}
            </div>
          )}
        </div>
      );
    });
  };

  // Handles updating ticket data
  // Uses router.refresh() to update the stale data on the
  // Admin server component page
  const handleFormUpdate = async (event: React.FormEvent) => {
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
      ticketId: ticket.ticketId,
      status: status.value,
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

  return (
    <div
      onClick={onDismiss}
      className='fixed w-screen h-screen bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className='min-w-[600px] max-w-full overflow-x-hidden min-h-[800px] bg-white rounded-xl p-2 flex flex-col relative'
      >
        <div className='flex justify-center'>
          <header className='text-lg font-bold'>
            Ticket #{ticketData?.ticketId}
          </header>
        </div>
        <div>
          <form onSubmit={handleFormUpdate}>
            {renderModalData()}
            <div className='space-x-2'>
              <button
                onClick={onDismiss}
                className='bg-blue-300 text-blue-700 text-sm font-semibold rounded-full py-3 px-8'
              >
                Close
              </button>
              <button className='bg-blue-700 text-white text-sm font-semibold rounded-full py-3 px-8'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
