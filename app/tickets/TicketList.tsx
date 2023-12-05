import Link from "next/link";
import React from "react";

const getTickets = async () => {
  const response = await fetch("http://localhost:4000/tickets", {
    /* using this property we can tell Next how 
    long we want to wait before revalidating the
    cached request
    */
    next: {
      revalidate: 2,
    },
  });
  return response.json();
};

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <>
      {tickets.map((ticket: any) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length && (
        <p className="text-center">There are no open tickets</p>
      )}
    </>
  );
}
