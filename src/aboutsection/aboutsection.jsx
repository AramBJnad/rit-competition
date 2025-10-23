import React from 'react';
import './aboutsection.css'
const Image_URL = 'https://images.pexels.com/photos/6647020/pexels-photo-6647020.jpeg'; 

const AboutSection = () => {
  return (
    <section className="py-20 px-4 sm:px-8 lg:px-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
    
        <div className="lg:w-1/2">
          <span className="inline-block bg-blue-50 text-blue-900 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Our Story
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            About Our Mission
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Love And Needs has been dedicated to improving lives and building stronger
            communities since 2010. We believe that every person deserves access to basic
            necessities, education, and opportunities for a better future.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Our work spans across multiple continents, reaching vulnerable populations with life-
            changing programs in education, healthcare, clean water access, and economic
            empowerment.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Through the generosity of our donors and the dedication of our volunteers, we've been
            able to touch millions of lives and create lasting change in communities around the
            world.
          </p>
          
          <ul className="space-y-3">
            <li className="flex items-start text-gray-700">
              <span className="text-green-500 mr-3 text-xl">✅</span> 15+ years of impact
            </li>
            <li className="flex items-start text-gray-700">
              <span className="text-green-500 mr-3 text-xl">✅</span> Global reach across 40+ countries
            </li>
            <li className="flex items-start text-gray-700">
              <span className="text-green-500 mr-3 text-xl">✅</span> 100% transparency in operations
            </li>
          </ul>
        </div>
        <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
          <div className="relative p-1.5 rounded-xl max-w-lg w-full 
                        bg-gradient-to-br from-blue-800 via-green-500 to-blue-800 
                        shadow-2xl scroll-smooth">
            
            <img 
              src= {Image_URL} 
              alt="picture" 
              className="w-full h-auto rounded-lg object-cover" 
              loading="lazy"
            />
            
            <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 
                          bg-gradient-to-br bg-blue-950
                          text-white p-4 sm:p-6 rounded-lg shadow-xl 
                          flex flex-col items-center justify-center 
                          transform translate-y-1/4 lg:translate-y-0">
              <span className="text-3xl sm:text-4xl font-bold">2.5M+</span>
              <span className="text-sm sm:text-base font-medium whitespace-nowrap">
                Lives Changed!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;