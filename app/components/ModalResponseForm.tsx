'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  TicketResponseType,
  TicketItem,
  ModalResponseFormProps,
} from '@/lib/types';
import { formLabels } from '@/lib/modalFormLabels';
import { getTicketModalData, handleFormUpdate } from '@/lib/modalFormHandlers';

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

  return (
    <div
      onClick={onDismiss}
      className='fixed w-full h-full bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className='max-w-[300px] md:min-w-[600px] md:max-w-[600px] overflow-x-hidden max-h-[90vh] overflow-y-auto bg-white rounded-xl p-2 flex flex-col relative'
      >
        <div className='flex justify-center'>
          <header className='text-lg font-bold'>
            Ticket #{ticketData?.ticketId}
          </header>
        </div>
        <div>
          <form
            onSubmit={(event) =>
              handleFormUpdate(
                event,
                ticket.ticketId,
                setTicketData,
                setCurrentResponse,
                onDismiss,
                router
              )
            }
          >
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
