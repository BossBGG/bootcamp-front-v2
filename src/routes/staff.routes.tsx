import { RouteObject } from 'react-router-dom';
import React from 'react';
import RoleBasedRoute from '../core/guards/RoleBasedRoute';
import StaffDashboardPage from '../pages/StaffDashboardPage';
import CreateEventPage from '../pages/CreateEventPage';
import StaffActivitiesPage from '../pages/StaffActivitiesPage';
import EditEventPage from '../pages/EditEventPage';
import ActivityParticipantsPage from '../pages/ActivityParticipantsPage';
import ApprovalRequestsPage from '../pages/ApprovalRequestsPage';



/**
 * Staff-specific routes
 */
const staffRoutes: RouteObject[] = [
  // หน้าแดชบอร์ดเจ้าหน้าที่หลัก
  {
    path: '/staff-dashboard',
    element: <StaffDashboardPage />,
  },
  // หน้าสร้างกิจกรรมใหม่
  {
    path: '/create-event',
    element: <CreateEventPage />,
  },
  // หน้ารายการกิจกรรมของเจ้าหน้าที่
  {
    path: '/staff/activities',
    element: <StaffActivitiesPage />,
  },
  // หน้าแก้ไขกิจกรรม
  {
    path: '/edit-event/:id',
    element: <EditEventPage />,
  },
  // หน้าแสดงรายชื่อผู้เข้าร่วมกิจกรรม
  {
    path: '/staff/activity-participants/:id',
    element: <ActivityParticipantsPage />,
  },
  // หน้าคำขออนุมัติเข้าร่วมกิจกรรม
  {
    path: '/staff/approval-requests',
    element: <ApprovalRequestsPage />,
  },
];

export default staffRoutes;