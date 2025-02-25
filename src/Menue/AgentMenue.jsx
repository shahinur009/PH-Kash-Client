import React from 'react';
import MenuItem from './MenuItem';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { FaCommentsDollar } from 'react-icons/fa6';

const AgentMenue = () => {
  return (
    <div className="flex flex-row lg:flex-col items-center lg:items-start  gap-2">
      <MenuItem
        icon={FaCommentsDollar}
        label="Transaction Management"
        address="transactionManagement"
      />

      <MenuItem
        icon={LiaFileInvoiceDollarSolid}
        label="Transaction History"
        address="transactionHistory"
      />
    </div>
  );
};

export default AgentMenue;
