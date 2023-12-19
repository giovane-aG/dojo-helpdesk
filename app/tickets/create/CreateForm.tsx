"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [priority, setPriority] = useState<string>("low");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(false);

    const ticket = {
      title,
      body,
      priority,
      user_email: "giovane@email.com",
    };

    const response = await fetch("http://localhost:4000/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });

    if (response.status === 201) {
      router.refresh();
      router.push("/tickets");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </label>
      <label>
        <span>Body</span>
        <textarea
          value={body}
          required
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setBody(e.target.value)
          }
        />
      </label>
      <label>
        <span>Priority</span>
        <select
          value={priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPriority(e.target.value)
          }
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  );
}
