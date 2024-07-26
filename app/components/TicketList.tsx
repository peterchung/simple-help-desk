'use client';

import { useState } from 'react';
import ModalResponseForm from './ModalResponseForm';

interface TicketTypes {
  ticketId: number;
  priority: string;
  status: string;
  requestedBy: string;
  email: string;
  subject: string;
  dateCreated: Date;
}

interface Filter {
  Status: string[];
  Priority: string[];
}

const filterOptions = {
  Status: ['New', 'In progress', 'Resolved'],
  Priority: ['Low', 'Med', 'High'],
};

export default function TicketList({
  tickets,
}: {
  tickets: TicketTypes[] | [];
}) {
  const [selectedFilter, setSelectedFilter] = useState<Filter>({
    Status: [],
    Priority: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [ticketEntry, setTicketEntry] = useState<TicketTypes | null>(null);

  const renderFilter = () => {
    return Object.entries(filterOptions).map(([filterType, options], idx) => (
      <div key={idx}>
        <ul className='flex space-x-4'>
          <li>{filterType}:</li>
          {renderFilterOptions(filterType as keyof Filter, options)}
        </ul>
      </div>
    ));
  };

  const renderFilterOptions = (filterType: keyof Filter, options: string[]) => {
    return options.map((option, idx) => (
      <li key={idx} className='flex space-x-1'>
        <input
          type='checkbox'
          checked={selectedFilter[filterType].includes(option)}
          onChange={() => toggleFilter(filterType, option)}
        />
        <div>{option}</div>
      </li>
    ));
  };

  const toggleFilter = (filterType: keyof Filter, option: string) => {
    setSelectedFilter((prevFilters) => {
      const currentFilters = prevFilters[filterType];

      const newFilter = currentFilters.includes(option)
        ? currentFilters.filter((selectedFilter: String) => {
            selectedFilter !== option;
          })
        : [...currentFilters, option];

      return {
        ...prevFilters,
        [filterType]: newFilter,
      };
    });
  };

  // Filter logic to only render tickets that match the filter
  // if no filters are selected (i.e. status/priority length = 0)
  // display all tickets
  const filteredTicketList = tickets.filter((ticket: TicketTypes) => {
    const isStatusFiltered = selectedFilter.Status.length > 0;
    const isPriorityFiltered = selectedFilter.Priority.length > 0;

    const statusFilter = isStatusFiltered
      ? selectedFilter.Status.includes(ticket.status)
      : true;

    const priorityFilter = isPriorityFiltered
      ? selectedFilter.Priority.includes(ticket.priority)
      : true;

    return statusFilter && priorityFilter;
  });

  const clearFilters = () => {
    setSelectedFilter({
      Status: [],
      Priority: [],
    });
  };

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='my-10'>
        <div className='flex justify-center text-3xl font-semibold mb-2'>
          Filters
        </div>
        {renderFilter()}
        <div className='flex justify-center mt-2'>
          <button
            onClick={clearFilters}
            className='bg-blue-700 text-white rounded-full font-semibold px-6 py-2'
          >
            Clear Filters
          </button>
        </div>
      </div>
      <table className='w-[1000px] rounded-lg overflow-hidden table-fixed'>
        <thead className='bg-blue-700 text-white'>
          <tr className='text-center tetx-lg'>
            <th className='py-2'>Priority</th>
            <th>Status</th>
            <th>Requested By</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTicketList.map((ticket: TicketTypes, idx: number) => (
            <tr
              key={idx}
              className={`text-center ${
                idx % 2 === 0 ? 'bg-gray-200' : 'bg-white'
              }`}
            >
              <td className='py-2'>{ticket.priority}</td>
              <td>{ticket.status}</td>
              <td>{ticket.requestedBy}</td>
              <td>{ticket.email}</td>
              <td>{ticket.subject}</td>
              <td>
                {ticket.dateCreated.toLocaleDateString('en-US', {
                  timeZone: 'UTC',
                })}
              </td>
              <td>
                <button
                  onClick={() => {
                    setTicketEntry(ticket);
                    handleModal();
                  }}
                  className='bg-blue-300 text-blue-700 rounded-full py-1 px-2'
                >
                  Open Ticket
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {ticketEntry && (
        <ModalResponseForm
          isOpen={modalOpen}
          onDismiss={handleModal}
          ticket={ticketEntry}
        />
      )}
    </div>
  );
}
