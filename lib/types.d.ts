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

export interface TicketResponseType {
  ticketId: number;
  priority: string;
  requestedBy: string;
  email: string;
  dateCreated: Date;
  lastModified: Date;
  subject: string;
  issueDescription: string;
  status: string;
  lastResponse: string;
}

export interface TicketItem {
  ticketId: number;
  priority: string;
  status: string;
  requestedBy: string;
  email: string;
  subject: string;
  dateCreated: Date;
}

export interface ModalResponseFormProps {
  isOpen: boolean;
  onDismiss: () => void;
  ticket: TicketItem;
}
