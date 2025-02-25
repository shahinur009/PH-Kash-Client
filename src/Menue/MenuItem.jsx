import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex flex-col lg:flex-row justify-between lg:justify-start items-center gap-1 px-3 lg:px-4 py-2 my-2  transition-colors duration-300 transform  hover:bg-blue-200    hover:text-gray-700 ${
          isActive
            ? 'bg-blue-400  text-gray-700 rounded-b-2xl lg:rounded-r-2xl font-bold'
            : 'text-gray-600'
        }`
      }
    >
      <Icon className="w-6 h-6" />

      <span className="mx-1 lg:mx-2 font-semibold text-wrap lg:text-nowrap text-center">
        {label}
      </span>
    </NavLink>
  );
};
MenuItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.elementType,
};

export default MenuItem;
