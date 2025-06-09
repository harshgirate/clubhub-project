import React from 'react';
import { Link } from 'react-router-dom';
import './ClubCard.css';

function ClubCard({ club }) {
  return (
    <div className="club-card">
      <img src={club.image} alt={club.name} className="club-image" />
      <div className="club-content">
        <h3>{club.name}</h3>
        <p>{club.description}</p>
        <div className="club-info">
          <span>Members: {club.memberCount}</span>
          <span>Category: {club.category}</span>
        </div>
        <Link to={`/clubs/${club.id}`} className="view-more-btn">
          View More
        </Link>
      </div>
    </div>
  );
}

export default ClubCard; 