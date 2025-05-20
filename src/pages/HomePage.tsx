import { useState, useEffect } from 'react';
import { useTheme } from '../stores/theme.store';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import { EventSectionCard } from '../components/layouts';
import Carousel from '../components/Carousel';
import { mockEvents, getEventsByType } from '../data/mockEvents';
import LoadingPage from './LoadingPage';

// ประเภทสำหรับฟิลเตอร์การค้นหา
interface SearchFilterType {
  id: string;
  label: string;
  checked: boolean;
}

// ข้อมูลจำลองสำหรับ AnimatedTestimonials
const topStudents = [
  {
    quote: "คะแนนสะสม: 100 คะแนน | ICT | CPE",
    name: "Boss1",
    designation: "อันดับที่ 1",
    src: "/image1.png",
  },
  {
    quote: "คะแนนสะสม: 90 คะแนน | ICT | CPE",
    name: "Boss2",
    designation: "อันดับที่ 2",
    src: "/image1.png",
  },
  {
    quote: "คะแนนสะสม: 80 คะแนน | ICT | CPE",
    name: "Boss3",
    designation: "อันดับที่ 3",
    src: "/image1.png",
  },
  {
    quote: "คะแนนสะสม: 70 คะแนน | ICT | CPE",
    name: "Boss4",
    designation: "อันดับที่ 4",
    src: "/image1.png",
  },
  {
    quote: "คะแนนสะสม: 60 คะแนน | ICT | CPE",
    name: "Boss5",
    designation: "อันดับที่ 5",
    src: "/image1.png",
  },
];

// ข้อมูลจำลองสำหรับ DraggableCard
const topEvents = [
  {
    id: 1,
    title: "Express Training",
    organizer: "INET",
    participants: 50,
    image: "/inet2.png",
  },
  {
    id: 2,
    title: "C# & .NAT Training",
    organizer: "Online asset",
    participants: 40,
    image: "/cws.png",
  },
  {
    id: 3,
    title: "Basic JavaScript",
    organizer: "INET",
    participants: 30,
    image: "/inet1.png",
  },
  {
    id: 4,
    title: "UX/UI Design Training",
    organizer: "IIG",
    participants: 20,
    image: "uxui.png",
  },
  {
    id: 5,
    title: "SQL & NoSQL Training",
    organizer: "Online asset",
    participants: 10,
    image: "/snd.png",
  },
];

interface TopEventCardProps {
  event: EventType;
  rank: number;
}

const TopEventCard: React.FC<TopEventCardProps> = ({ event, rank }) => {
  const { theme } = useTheme();

  return (
    <DraggableCardContainer className="mx-auto my-4">
      <DraggableCardBody
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } w-64 h-96 p-6 relative overflow-hidden`}
      >
        {/* เนื้อหาการ์ด */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="text-center mb-4">
            <span
              className={`text-lg font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              อันดับที่ {rank}
            </span>
          </div>

          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-32 object-cover"
            />
          </div>

          <h3
            className={`text-lg font-semibold mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            {event.title}
          </h3>

          <div
            className={`text-sm mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            ผู้จัด: {event.organizer}
          </div>

          <div className="mt-auto">
            <div
              className={`text-base font-medium ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            >
              ผู้เข้าร่วม: {event.participants} คน
            </div>
          </div>
        </div>
      </DraggableCardBody>
    </DraggableCardContainer>
  );
};


function HomePage() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilterType[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // แยกกิจกรรมตามประเภท
  const { trainingEvents, volunteerEvents, helperEvents } = getEventsByType();
  
  // จำลองการโหลดข้อมูลเมื่อเริ่มต้น
  useEffect(() => {
    // จำลองการโหลดข้อมูลเริ่มต้น
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // รูปภาพสำหรับ Carousel
  const carouselImages = [
    {
      src: '/uxui.png',
      alt: 'กิจกรรมที่ 1',
      caption: 'crin X เม.พะเยา ร่วมสร้างนักพัฒนาเกมบนมือถือผ่านสากล'
    },
    {
      src: '/uxui.png',
      alt: 'กิจกรรมที่ 2',
      caption: 'อบรมการเขียนโปรแกรม Python'
    },
    {
      src: '/uxui.png',
      alt: 'กิจกรรมที่ 3',
      caption: 'ปลูกป่าชายเลนเพื่อโลกสีเขียว'
    },
    {
      src: '/uxui.png',
      alt: 'กิจกรรมที่ 4',
      caption: 'งานวิ่งการกุศล Run for Wildlife'
    },
    {
      src: '/uxui.png',
      alt: 'กิจกรรมที่ 5',
      caption: 'อบรมปฐมพยาบาลเบื้องต้น'
    },
  ];

  // ฟังก์ชันสำหรับการจัดการการค้นหา
  const handleSearch = (query: string, filters: SearchFilterType[]) => {
    setIsLoading(true); // เริ่มแสดง loading
    
    // จำลองการโหลดข้อมูลเมื่อค้นหา
    setTimeout(() => {
      setSearchQuery(query);
      setSearchFilters(filters);
      setIsLoading(false);
      
      // นำทางไปยังหน้าค้นหาพร้อมพารามิเตอร์
      const searchParams = new URLSearchParams();
      if (query) searchParams.set('q', query);
      
      // ตรวจสอบฟิลเตอร์ที่เลือก
      filters.forEach(filter => {
        if (filter.checked) {
          searchParams.set(filter.id, 'true');
        }
      });
      
      window.location.href = `/search?${searchParams.toString()}`;
    }, 2000); // จำลองการโหลด 2 วินาที
  };

  // ฟังก์ชันกรองกิจกรรมตามประเภท
  const getFilteredEvents = () => {
    if (activeTab === 'all') return mockEvents;
    if (activeTab === 'training') return trainingEvents;
    if (activeTab === 'volunteer') return volunteerEvents;
    if (activeTab === 'helper') return helperEvents;
    return mockEvents;
  };

  // ฟังก์ชันเปลี่ยนแท็บที่เลือก
  const handleTabChange = (tab: string) => {
    setIsLoading(true); // เริ่มแสดง loading
    
    // จำลองการโหลดข้อมูลเมื่อเปลี่ยนแท็บ
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 1000); // จำลองการโหลด 1 วินาที
  };

  // แสดง LoadingPage ถ้ากำลังโหลดข้อมูล
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Search Bar */}
      <SearchBar 
        className="px-6 py-4" 
        onSearch={handleSearch}
      />
      
      <div className="p-6 pb-12">
        {/* หัวข้อหลัก */}
        <h1 className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          กิจกรรมของมหาวิทยาลัย
        </h1>
        
        {/* Carousel */}
        <div className="mb-8">
          <Carousel 
            images={carouselImages}
            autoPlay={true}
            interval={5000}
            showIndicators={true}
            showArrows={true}
          />
        </div>

        {/* นิสิตที่มีคะแนนสะสมมากที่สุด */}
        <div className="mb-12">
          <h2
            className={`text-xl font-bold mb-6 text-center ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            นิสิตที่มีคะแนนสะสมมากที่สุด
          </h2>

          <div
            className={`p-6 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } shadow-lg`}
          >
            <AnimatedTestimonials testimonials={topStudents} autoplay={true} />
          </div>
        </div>

        {/* กิจกรรมที่มีคนเข้าร่วมมากที่สุด */}
        <div className="mb-12">
          <h2
            className={`text-xl font-bold mb-6 text-center ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            กิจกรรมที่มีคนเข้าร่วมมากที่สุด
          </h2>

          <div className="relative r  ">
            {/* ข้อความพื้นหลัง */}
            <div
              className="absolute inset-0 flex flex-col justify-center items-cednter opacity-10 pointer-events-none select-none mt-38 ml-96"
              style={{ zIndex: 0 }}
            >
              <div className="text-6xl font-bold text-black mb-8">
                GOOD EVENT
              </div>
              <div className="text-6xl font-bold text-black mb-8">
                GOOD TRAINING
              </div>
              <div className="text-6xl font-bold text-black">GOOD SKILL</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {topEvents.map((event, index) => (
              <TopEventCard key={event.id} event={event} rank={index + 1} />
            ))}
          </div>
        </div>
        
        {/* แท็บเลือกประเภทกิจกรรม */}
        <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
          <button 
            onClick={() => handleTabChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeTab === 'all'
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            ทั้งหมด
          </button>
          <button 
            onClick={() => handleTabChange('training')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeTab === 'training'
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            อบรม
          </button>
          <button 
            onClick={() => handleTabChange('volunteer')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeTab === 'volunteer'
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            อาสา
          </button>
          <button 
            onClick={() => handleTabChange('helper')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeTab === 'helper'
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            ช่วยงาน
          </button>
        </div>
        
        {/* แสดงกิจกรรมตามแท็บที่เลือก */}
        {activeTab === 'all' && (
          <>
            {/* กิจกรรมประเภทอบรม */}
            <EventSectionCard
              title="กิจกรรม"
              eventType="อบรม"
              events={trainingEvents}
              showMoreLink="/events/training"
            />
            
            {/* กิจกรรมประเภทอาสา */}
            <EventSectionCard
              title="กิจกรรม"
              eventType="อาสา"
              events={volunteerEvents}
              showMoreLink="/events/volunteer"
            />
            
            {/* กิจกรรมประเภทช่วยงาน */}
            <EventSectionCard
              title="กิจกรรม"
              eventType="ช่วยงาน"
              events={helperEvents}
              showMoreLink="/events/helper"
            />
          </>
        )}
        
        {activeTab === 'training' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
        
        {activeTab === 'volunteer' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
        
        {activeTab === 'helper' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {helperEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;