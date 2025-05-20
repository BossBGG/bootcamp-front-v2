import { RouteObject } from 'react-router-dom';
import React from 'react';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import EventTypePage from '../pages/EventTypePage';
import SearchEventPage from '../pages/SearchEventPage';
import EventDetailPage from '../pages/EventDetailPage';
import StaffDashboardPage from '../pages/StaffDashboardPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import staffRoutes from './staff.routes';
import adminRoutes from './admin.routes';
import Error500Page from '../pages/Error500Page';

const HomePage = React.lazy(() => import('../pages/HomePage'));
const ActivitiesPage = React.lazy(() => import('../pages/ActivitiesPage'));
const HistoryPage = React.lazy(() => import('../pages/HistoryPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFound404.page'));

/**
 * กำหนดเส้นทางทั้งหมดในแอปพลิเคชัน
 * ปรับให้เข้าถึงทุกเส้นทางได้โดยไม่ต้องมีการยืนยันตัวตน
 */
const routes: RouteObject[] = [
  // หน้าหลักที่ทุกคนเข้าถึงได้
  {
    path: '/',
    element: <HomePage />,
  },
  // หน้าล็อกอิน
  {
    path: '/login',
    element: <LoginPage />,
  },
  // หน้าสมัครสมาชิก
  {
    path: '/register',
    element: <RegisterPage />,
  },
  // หน้ากิจกรรมของฉัน
  {
    path: '/activities',
    element: <ActivitiesPage />,
  },
  // หน้าประวัติกิจกรรม
  {
    path: '/history',
    element: <HistoryPage />,
  },
   // หน้าโปรไฟล์
   {
    path: '/profile',
    element: <ProfilePage />,
  },
  // หน้าประเภทกิจกรรม
  {
    path: '/events/:type',
    element: <EventTypePage />,
  },
  // หน้าแสดงรายละเอียดกิจกรรม
  {
    path: '/events/detail/:id',
    element: <EventDetailPage />,
  },
  // หน้าค้นหากิจกรรม
  {
    path: '/search',
    element: <SearchEventPage />,
  },
  // แดชบอร์ดเจ้าหน้าที่
  {
    path: '/staff-dashboard',
    element: <StaffDashboardPage />,
  },
  // แดชบอร์ดแอดมิน
  {
    path: '/admin',
    element: <AdminDashboardPage />,
  },
  
  // เพิ่มเส้นทางย่อยของเจ้าหน้าที่และแอดมินเข้าไปโดยตรง
  ...staffRoutes.map(route => ({
    ...route,
    element: route.element,
  })),
  
  ...adminRoutes.map(route => ({
    ...route,
    element: route.element,
  })),
  
  // หน้า 404 สำหรับเส้นทางที่ไม่มีอยู่
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/error-500',
    element: <Error500Page />,
  }
 
];

export default routes;