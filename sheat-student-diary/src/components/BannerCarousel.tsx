import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, MapPin, Sparkles, GraduationCap } from 'lucide-react';

export const BannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      id: 1,
      bgGradient: 'from-[#435585] via-[#354368] to-[#2D2926]',
      title: 'ADMISSIONS OPEN 2026-27',
      subtitle: 'SHEAT GROUP OF INSTITUTIONS',
      motto: 'Learn Today, Lead Tomorrow',
      badge: 'AKTU & BTE Approved',
      coursesLeft: ['CSE Data Science', 'Mechanical Engg', 'Electrical Engg'],
      coursesRight: ['Higher Ed (BA, MA, B.Ed)', 'Paramedical (GNM)', 'Polytechnic Diploma'],
      phone: '+91 7753811344',
      location: '15 km Milestone, NH-56, Airport Road, Babatpur, Varanasi (U.P.)',
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      bgGradient: 'from-[#2D2926] via-[#3B3632] to-[#435585]',
      title: 'SCHOLARSHIP & FEE ASSISTANCE',
      subtitle: 'UP Government Scholarship Eligible',
      motto: 'Empowering Young Minds in Eastern UP',
      badge: 'Apply Before 31st August',
      coursesLeft: ['B.Tech CSE & Data Science', 'Polytechnic (ME, CE, EE)', 'B.Pharm & D.Pharm'],
      coursesRight: ['Paramedical & Nursing', 'B.Ed & Diploma Courses', 'Hostel & Transport Available'],
      phone: '+91 7753811344',
      location: 'SHEAT Campus, Babatpur Airport Road, Varanasi',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      bgGradient: 'from-[#354368] via-[#435585] to-[#2D2926]',
      title: 'TECHSURGE & INNOVATION FEST 2026',
      subtitle: 'Annual Hackathon & Cultural Mega Fest',
      motto: 'Showcase Your Tech Talent',
      badge: 'Over ₹2 Lakh Prizes',
      coursesLeft: ['Codeathon & Web Dev', 'Robotics & IoT Expo', 'Cultural Night & Band'],
      coursesRight: ['Guest Speakers from IT', 'Sports Tournaments', 'Alumni Meet & Networking'],
      phone: '+91 7753811344',
      location: 'Main Auditorium, SHEAT Varanasi Campus',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative overflow-hidden my-3 px-3">
      <div className={`rounded-xl bg-gradient-to-r ${currentBanner.bgGradient} text-white shadow-md border border-purple-800/40 p-3 sm:p-4 transition-all duration-500`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Content Left Column */}
          <div className="md:col-span-8 space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-purple-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-2.5 h-2.5" /> {currentBanner.badge}
              </span>
              <span className="text-[10px] text-fuchsia-200 italic font-medium">
                {currentBanner.motto}
              </span>
            </div>

            <div className="space-y-0.5">
              <h3 className="text-xs text-purple-200 font-semibold tracking-wide">
                {currentBanner.subtitle}
              </h3>
              <h2 className="text-base sm:text-xl font-black tracking-tight text-white uppercase drop-shadow-xs">
                {currentBanner.title}
              </h2>
            </div>

            {/* Courses list columns */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1 text-[11px] text-purple-100">
              <ul className="space-y-0.5">
                {currentBanner.coursesLeft.map((course, idx) => (
                  <li key={idx} className="flex items-center space-x-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
                    <span className="truncate">{course}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-0.5">
                {currentBanner.coursesRight.map((course, idx) => (
                  <li key={idx} className="flex items-center space-x-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 inline-block"></span>
                    <span className="truncate">{course}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Contact bar */}
            <div className="pt-2 border-t border-purple-700/50 flex flex-wrap items-center justify-between gap-2 text-[10px] text-purple-200">
              <div className="flex items-center space-x-1 bg-black/30 px-2 py-1 rounded text-amber-300 font-bold">
                <Phone className="w-3 h-3" />
                <span>FOR ENQUIRY: {currentBanner.phone}</span>
              </div>
              <div className="flex items-center space-x-1 text-purple-200 font-medium truncate max-w-full">
                <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
                <span className="truncate">{currentBanner.location}</span>
              </div>
            </div>
          </div>

          {/* Image Right Column */}
          <div className="hidden md:block md:col-span-4 h-full relative rounded-lg overflow-hidden border border-purple-400/30 shadow-inner min-h-[140px]">
            <img
              src={currentBanner.imageUrl}
              alt={currentBanner.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent flex items-end p-2">
              <span className="text-[10px] font-bold text-white flex items-center gap-1 bg-purple-900/80 px-2 py-0.5 rounded backdrop-blur-xs">
                <GraduationCap className="w-3 h-3 text-amber-300" /> SHEAT Campus
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white hover:bg-black/70 flex items-center justify-center backdrop-blur-xs border border-white/20 transition-all"
        aria-label="Previous banner"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white hover:bg-black/70 flex items-center justify-center backdrop-blur-xs border border-white/20 transition-all"
        aria-label="Next banner"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-1.5 mt-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-5 bg-[#435585]' : 'w-1.5 bg-[#E8E4E1]'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
