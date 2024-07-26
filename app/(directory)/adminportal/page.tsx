import TicketList from '@/app/components/TicketList';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

const getTickets = async () => {
  try {
    const ticketList = await db.ticketItem.findMany({
      orderBy: {
        ticketId: 'asc',
      },
    });

    return ticketList;
  } catch (err) {
    console.error('Error retrieving tickets', err);
    return [];
  }
};

export default async function AdminPortal() {
  const ticketData = await getTickets();

  return (
    <div>
      <TicketList tickets={ticketData} />
    </div>
  );
}
