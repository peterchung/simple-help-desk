export interface TicketTypes {
  ticketId: number;
  priority: string;
  status: string;
  requestedBy: string;
  email: string;
  subject: string;
  dateCreated: Date;
}

export interface Filter {
  Status: string[];
  Priority: string[];
}
