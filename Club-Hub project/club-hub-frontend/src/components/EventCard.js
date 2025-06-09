import React from 'react';
import './EventCard.css';

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-date">
        <span className="date">{new Date(event.date).getDate()}</span>
        <span className="month">
          {new Date(event.date).toLocaleString('default', { month: 'short' })}
        </span>
      </div>
      <div className="event-details">
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <div className="event-info">
          <span>🕒 {event.time}</span>
          <span>📍 {event.location}</span>
          <span>👥 {event.organizer}</span>
        </div>
      </div>
    </div>
  );
}

export default EventCard; 