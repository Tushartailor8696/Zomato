import React from 'react';

export default function Home() {
  // कैटेगरीज डेटा
  const categories = [
    {
      id: 1,
      title: "Order Online",
      description: "Stay home and order to your doorstep",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      link: "#"
    },
    {
      id: 2,
      title: "Dining Out",
      description: "View the city's favourite dining venues",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      link: "#"
    },
    {
      id: 3,
      title: "Pro Membership",
      description: "Get up to 40% off on your bills",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
      link: "#"
    }
  ];

  // कलेक्शंस डेटा
  const collections = [
    { id: 1, title: "Trending This Week", places: "30 Places", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: "Best of Jodhpur", places: "21 Places", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: "Outdoor Dining", places: "15 Places", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80" },
    { id: 4, title: "Brunch Spots", places: "11 Places", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80" }
  ];

  // टीम / शेफ आईडी कार्ड्स का डेटा
  const teamIdCards = [
    {
      id: "EMP-2026-01",
      name: "Chef Rahul Sharma",
      role: "Master Chef & Culinary Head",
      location: "Jodhpur Kitchen",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80",
      status: "Active"
    },
    {
      id: "EMP-2026-02",
      name: "Priya Rathore",
      role: "Full Stack Developer (MERN)",
      location: "Tech Operations",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      status: "Active"
    },
    {
      id: "EMP-2026-03",
      name: "Amit Gehlot",
      role: "Database & Backend Engineer",
      location: "MongoDB Cloud Admin",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      status: "Active"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* --- हीरो सेक्शन (Zomato-style Header with Image) --- */}
      <div className="relative h-[480px] bg-gray-900 flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-35 blur-[1px]"
        />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white tracking-tighter mb-4 flex items-baseline">
            zomato
            <span className="text-xl font-medium text-white/80 ml-2">(MERN Version)</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-white font-normal mb-10 leading-snug">
            Discover the best food & drinks in <span className="font-semibold text-red-400">Jodhpur</span>
          </p>

          {/* सर्च बार सेक्शन */}
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row items-center p-2.5 gap-2">
            <div className="flex items-center gap-2 px-3 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0">
              <span className="text-red-500 text-xl">📍</span>
              <input type="text" placeholder="Jodhpur, Rajasthan" className="w-full text-base p-1 focus:outline-none" />
            </div>
            <div className="flex items-center gap-2 px-3 w-full md:w-2/3">
              <span className="text-gray-400 text-xl">🔍</span>
              <input type="text" placeholder="Search for restaurant, cuisine or a dish..." className="w-full text-base p-1 focus:outline-none" />
            </div>
          </div>
        </div>
      </div>


      {/* --- मुख्य कंटेन्ट सेक्शन --- */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* --- 1. कैटेगरीज कार्ड्स (Images के साथ) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map(cat => (
            <a key={cat.id} href={cat.link} className="group block rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
              <div className="relative h-56 overflow-hidden">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">{cat.title}</h3>
                <p className="text-gray-600 text-base">{cat.description}</p>
              </div>
            </a>
          ))}
        </div>


        {/* --- 2. कलेक्शंस सेक्शन (Images के साथ) --- */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Collections</h2>
              <p className="text-lg text-gray-600 mt-1">Explore curated lists of top restaurants and cafes in Jodhpur</p>
            </div>
            <a href="#" className="text-red-600 font-semibold hover:text-red-700 flex items-center gap-1 group">
              All collections <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {collections.map(col => (
              <a key={col.id} href="#" className="relative rounded-2xl overflow-hidden group aspect-[3/4] shadow-lg block">
                <img src={col.image} alt={col.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end">
                  <h4 className="text-xl font-bold text-white tracking-tight">{col.title}</h4>
                  <p className="text-white/80 text-sm">{col.places}</p>
                </div>
              </a>
            ))}
          </div>
        </div>


        {/* --- 3. ID CARDS SECTION (ऑफिशियल आईडी कार्ड्स) --- */}
        <div className="space-y-8 bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-inner">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Verified Team & Staff
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">Official ID Cards</h2>
            <p className="text-gray-600 text-sm">Meet our core team members managing this MERN platform and kitchen operations.</p>
          </div>

          {/* आईडी कार्ड्स ग्रिड */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {teamIdCards.map(person => (
              <div key={person.id} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-xl transition flex flex-col items-center text-center space-y-4">
                
                {/* आईडी कार्ड टॉप हेडर */}
                <div className="w-full flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">ZOMATO MERN ID</span>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">{person.status}</span>
                </div>

                {/* प्रोफाइल इमेज */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-50 shadow-inner">
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                </div>

                {/* विवरण */}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                  <p className="text-red-600 font-medium text-sm">{person.role}</p>
                  <p className="text-gray-500 text-xs">{person.location}</p>
                </div>

                {/* आईडी नंबर */}
                <div className="w-full bg-gray-50 border border-gray-100 py-2 rounded-xl text-xs font-mono font-semibold text-gray-600">
                  ID: {person.id}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>


      {/* --- फुटर --- */}
      <footer className="bg-gray-100 mt-20 border-t border-gray-200 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1 space-y-4">
             <h2 className="text-3xl font-black text-gray-950 tracking-tighter">zomato</h2>
             <p className="text-gray-600 text-sm">MERN Application Demo. Inspired by Zomato UI.</p>
          </div>
          {["About", "Company", "For Restaurants", "Learn More", "Social"].map(section => (
            <div key={section}>
                <h5 className="font-semibold text-gray-950 mb-3 uppercase tracking-widest text-sm">{section}</h5>
                <ul className="space-y-2 text-gray-600 text-sm">
                    {["Team", "Careers", "Partner", "Privacy", "Terms"].map(link => (
                        <li key={link}><a href="#" className="hover:text-gray-900">{link}</a></li>
                    ))}
                </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-xs">
            © 2026 Zomato MERN Demo. All rights reserved. Jodhpur, Rajasthan, India.
        </div>
      </footer>

    </div>
  );
}