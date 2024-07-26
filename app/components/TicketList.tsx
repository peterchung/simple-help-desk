'use client';

interface TicketTypes {
  priority: String;
  status: String;
  requestedBy: String;
  email: String;
  subject: String;
  dateCreated: Date;
}

export default function TicketList({
  tickets,
}: {
  tickets: TicketTypes[] | [];
}) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Status</th>
            <th>Requested By</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket: TicketTypes, idx: number) => (
            <tr key={idx}>
              <td>{ticket.priority}</td>
              <td>{ticket.status}</td>
              <td>{ticket.requestedBy}</td>
              <td>{ticket.email}</td>
              <td>{ticket.subject}</td>
              <td>
                {ticket.dateCreated.toLocaleDateString('en-US', {
                  timeZone: 'UTC',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
