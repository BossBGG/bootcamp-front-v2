import { RouteObject } from 'react-router-dom';
import React from 'react';
import RoleBasedRoute from '../core/guards/RoleBasedRoute';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import EventApprovalRequestsPage from '../pages/EventApprovalRequestsPage';
import UserPermissionsPage from '../pages/UsePermissionsPage';
import UserSuspensionPage from '../pages/UserSuspensionPage';

// Placeholder components สำหรับหน้าที่ยังไม่ได้สร้าง



/**
 * Admin-specific routes
 */
const adminRoutes: RouteObject[] = [
  // หน้าแดชบอร์ดแอดมินหลัก
  {
    path: '/admin',
    element: <AdminDashboardPage />,
  },
  // หน้าจัดการคำขออนุมัติกิจกรรม
  {
    path: '/admin/event-approval',
    element: <EventApprovalRequestsPage />,
  },
 
  // หน้าจัดการสิทธิ์ผู้ใช้
  {
    path: '/admin/user-permissions',
    element: <UserPermissionsPage />,
  },
  // หน้าระงับบัญชีผู้ใช้
  {
    path: '/admin/user-suspension',
    element: <UserSuspensionPage />,
  },
];

export default adminRoutes;