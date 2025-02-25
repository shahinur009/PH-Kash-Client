import React from 'react';
import { BiSolidBadgeDollar } from 'react-icons/bi';
import MenuItem from './MenuItem';
import { FaUsersCog } from 'react-icons/fa';

const AdminMenue = () => {
  return (
    <div className="flex flex-row lg:flex-col items-center lg:items-start  gap-2">
      <MenuItem
        icon={FaUsersCog}
        label="User Management"
        address="userManagement"
      />

      <MenuItem
        icon={BiSolidBadgeDollar}
        label="System Monitoring"
        address="systemMonitoring"
      />
    </div>
  );
};

export default AdminMenue;
