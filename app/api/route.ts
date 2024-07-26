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
