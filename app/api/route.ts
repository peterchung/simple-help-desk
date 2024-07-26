import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, subject, priority, description } = await req.json();

    const ticketInputs = {
      priority,
      status: 'New',
      requestedBy: name,
      email,
      subject,
      dateCreated: new Date(),
    };

    const ticketEntry = await db.ticketItem.create({
      data: ticketInputs,
    });

    const ticketResponseInputs = {
      ticketId: ticketEntry.ticketId,
      requestedBy: name,
      email,
      priority,
      dateCreated: new Date(),
      subject,
      issueDescription: description,
      status: 'New',
      lastResponse: '',
    };

    const ticketResponseEntry = await db.ticketResponse.create({
      data: ticketResponseInputs,
    });

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        error: `Error occured while creating ticket: ${err}`,
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const ticketId = req.nextUrl.searchParams.get('ticketId');

    if (!ticketId) {
      return NextResponse.json(
        {
          error: 'Ticket ID is required',
        },
        { status: 400 }
      );
    }

    const ticketResponseData = await db.ticketResponse.findUnique({
      where: {
        ticketId: parseInt(ticketId),
      },
    });

    return NextResponse.json(ticketResponseData);
  } catch (err) {
    return NextResponse.json(
      {
        error: `Error occured while retrieving ticket: ${err}`,
      },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { ticketId, status, lastModified, lastResponse } = await req.json();

    const updateTicketItem = await db.ticketItem.update({
      where: {
        ticketId,
      },
      data: {
        status,
      },
    });

    const updateTicketResponse = await db.ticketResponse.update({
      where: {
        ticketId,
      },
      data: {
        status,
        lastModified,
        lastResponse,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        error: `An error occured while retrieving the transaction: ${err}`,
      },
      { status: 500 }
    );
  }
};
