import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/inter';
import './Home.css';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Add your event images data
  const eventImages = [
    {
      url: "/images/svvv-dance-event.jpg",
      title: "Spandan 2024",
      description: "Dance Competition"
    },
    {
      url: "/images/svvv-convocation-students.jpg",
      title: "Convocation 2024",
      description: "Convocation Ceremony"
    },
    {
      url: "/images/svvv-imun.jpg",
      title: "IMUN 2024",
      description: "International Model United Nations"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === eventImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative pt-24 pb-40 overflow-hidden">
        <Container maxWidth="lg">
          <div className={`text-center space-y-12 fade-in-up ${isVisible ? 'visible' : ''}`}>
            <h1 className="text-8xl font-black font-poppins tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#001f3f] to-[#0056b3]">
              Club<span className="text-[#52ab98]">Hub</span>
            </h1>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Your gateway to campus life. Join clubs, attend events, and build lasting connections.
            </p>
            <div className="flex gap-8 justify-center items-center">
              <Link 
                to="/clubs"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-[#001f3f] to-[#0056b3] rounded-full hover:from-[#0056b3] hover:to-[#001f3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001f3f]"
              >
                <span className="relative">Explore Clubs</span>
              </Link>
              <Link 
                to="/login"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-[#001f3f] transition-all duration-200 bg-white border-2 border-[#001f3f] rounded-full hover:bg-[#001f3f] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001f3f]"
              >
                <span className="relative">Sign In</span>
              </Link>
            </div>
          </div>
        </Container>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      {/* Features Section */}
      <div className="py-32 bg-white">
        <Container maxWidth="lg">
          <h2 className="text-4xl font-bold text-center text-[#001f3f] mb-20">
            Everything you need to enhance your campus life
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: "🎯",
                title: "Join Clubs",
                description: "Discover and join clubs that match your interests and passions."
              },
              {
                icon: "📅",
                title: "Attend Events",
                description: "Stay updated with upcoming events and never miss an opportunity."
              },
              {
                icon: "🤝",
                title: "Build Network",
                description: "Connect with like-minded people and grow your network."
              }
            ].map((feature, index) => (
              <div key={index} 
                className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300
                         transform hover:-translate-y-2 border border-gray-100 hover:border-[#52ab98]">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-[#001f3f] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* About Section with Image Carousel */}
      <div className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl font-bold text-[#001f3f] leading-tight">
                Empowering Student Communities at{" "}
                <span className="text-[#52ab98]">SVVV</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                ClubHub is your central platform for discovering and engaging with student clubs at SVVV. 
                We believe in fostering a vibrant campus culture where students can explore their interests, 
                develop leadership skills, and build lasting connections.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                {[
                  { number: "20+", label: "Active Clubs" },
                  { number: "50+", label: "Events Monthly" }
                ].map((stat, index) => (
                  <div key={index} 
                    className="bg-gradient-to-r from-[#001f3f] to-[#0056b3] p-8 rounded-2xl text-center 
                             transform hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Image Carousel */}
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl group">
              <div className="h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                <div className="absolute inset-0 flex">
                  {eventImages.map((image, index) => (
                    <div key={index} className="min-w-full h-full relative">
                      <img 
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/fallback-image.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001f3f] via-transparent to-transparent opacity-80"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h4 className="text-2xl font-semibold text-white mb-2">{image.title}</h4>
                        <p className="text-blue-200 text-lg">{image.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {eventImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'w-8 bg-[#52ab98]' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-32 bg-gradient-to-r from-[#001f3f] to-[#0056b3]">
        <Container maxWidth="lg">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-white mb-8">
              Ready to get started?
            </h2>
            <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
              Join ClubHub today and become part of a vibrant community of students who are passionate about making the most of their campus life.
            </p>
            <Link 
              to="/register"
              className="inline-block bg-white text-[#001f3f] px-12 py-5 rounded-full text-lg font-semibold
                       hover:bg-blue-50 transition-all transform hover:-translate-y-1 hover:shadow-xl"
            >
              Sign Up Now
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home; 