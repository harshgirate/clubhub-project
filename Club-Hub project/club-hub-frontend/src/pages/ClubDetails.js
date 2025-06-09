import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ClubDetails.css';

function ClubDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  
  // Dummy data - replace with actual API call
  const club = {
    id,
    name: "Technical Club",
    description: "A platform for tech enthusiasts to collaborate, learn, and build innovative solutions. We organize workshops, hackathons, and tech talks to foster a culture of technological excellence.",
    memberCount: 150,
    category: "Technology",
    coverImage: "https://example.com/tech-cover.jpg",
    events: [
      {
        title: "Web Development Workshop",
        date: "March 25, 2024",
        time: "3:00 PM",
        location: "Lab 201"
      },
      {
        title: "Hackathon 2024",
        date: "April 5, 2024",
        time: "9:00 AM",
        location: "Main Auditorium"
      }
    ],
    announcements: [
      {
        title: "New Project Initiative",
        date: "March 15, 2024",
        content: "We're starting a new AI project. Join us!"
      },
      {
        title: "Committee Applications Open",
        date: "March 10, 2024",
        content: "Apply for the technical team positions"
      }
    ],
    leaders: [
      {
        name: "Sarah Johnson",
        role: "President",
        image: "https://example.com/sarah.jpg"
      },
      {
        name: "Mike Chen",
        role: "Technical Lead",
        image: "https://example.com/mike.jpg"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#2b6777]">
      {/* Hero Section */}
      <div className="hero-gradient bg-gradient-to-r from-[#2b6777] to-[#2b6777] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold font-poppins text-white mb-6">
              {club.name}
            </h1>
            <p className="text-xl text-[#c8d8e4] max-w-3xl mx-auto mb-8">
              {club.category} • {club.memberCount} Members
            </p>
            <button className="join-button px-8 py-3 bg-[#52ab98] text-white rounded-lg font-semibold hover:bg-[#2b6777] transition-all">
              Join Club
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Navigation Tabs */}
        <div className="tab-container flex space-x-6 mb-8 border-b border-[#2b6777]">
          {['about', 'events', 'announcements', 'leaders'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 text-lg font-medium capitalize transition-all
                ${activeTab === tab 
                  ? 'text-white border-b-2 border-[#52ab98]' 
                  : 'text-[#c8d8e4] hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="club-details-content bg-[#2b6777] rounded-xl p-8 shadow-xl">
          {activeTab === 'about' && (
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">About the Club</h2>
              <p className="text-[#c8d8e4] leading-relaxed">{club.description}</p>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
              <div className="grid gap-6">
                {club.events.map((event, index) => (
                  <div key={index} className="event-card bg-[#2b6777] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                    <div className="text-[#c8d8e4] space-y-1">
                      <p>{event.date} at {event.time}</p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Latest Announcements</h2>
              <div className="space-y-6">
                {club.announcements.map((announcement, index) => (
                  <div key={index} className="announcement-card border-l-4 border-[#52ab98] bg-[#2b6777] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-2">{announcement.title}</h3>
                    <p className="text-[#c8d8e4] mb-2">{announcement.date}</p>
                    <p className="text-[#c8d8e4]">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leaders' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Club Leaders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {club.leaders.map((leader, index) => (
                  <div key={index} className="leader-card bg-[#2b6777] p-6 rounded-lg flex items-center space-x-4">
                    <div className="leader-image w-16 h-16 rounded-full bg-[#52ab98] overflow-hidden">
                      {/* Add actual image here */}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{leader.name}</h3>
                      <p className="text-[#c8d8e4]">{leader.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClubDetails; 