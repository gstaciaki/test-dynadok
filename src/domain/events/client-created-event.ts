export interface ClientCreatedEvent {
  type: "client-created";
  payload: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}
