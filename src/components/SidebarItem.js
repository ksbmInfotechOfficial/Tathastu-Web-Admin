import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const SidebarItem = ({ to, icon: Icon, label, isSidebarOpen, isActive, children }) => {
  const location = useLocation();
  const hasChildren = children && children.length > 0;

  // Check if a child item is active based on location.pathname
  const isChildActive = hasChildren && children.some((child) => location.pathname.startsWith(child.to));
  const [open, setOpen] = useState(isChildActive);

  // Set open state to true if any child is active
  useEffect(() => {
    if (isChildActive) setOpen(true);
  }, [location.pathname]);

  // Handle submenu toggle
  const handleClick = () => {
    if (hasChildren) setOpen((prev) => !prev);
  };

  // Use a Link to navigate for non-submenu items
  const renderLink = (
    <Link
      to={to}
      className={`flex items-center justify-between cursor-pointer rounded-md px-3 py-2 transition-all duration-300 ease-in-out ${
        isActive(to) || isChildActive ? 'bg-[#C2410C] text-white' : 'hover:bg-[#9A3412] hover:text-white'
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={`text-lg ${isActive(to) || isChildActive ? 'text-white' : 'text-[#C2410C]'}`} />
        {isSidebarOpen && <span className="text-sm font-medium text-blue">{label}</span>}
      </div>
      {hasChildren && isSidebarOpen && (
        <span>{open ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}</span>
      )}
    </Link>
  );

  return (
    <li>
      {/* If there's no submenu, render a normal clickable Link */}
      {!hasChildren ? (
        renderLink
      ) : (
        <div onClick={handleClick} className="cursor-pointer">
          {renderLink}
        </div>
      )}

      {/* Submenu */}
      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open && isSidebarOpen ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="ml-8 space-y-1">
            {children?.map((child) => (
              <li key={child.to}>
                <Link
                  to={child.to}
                  className={`block text-sm px-2 py-1 rounded-md transition duration-200 ${
                    isActive(child.to) ? 'bg-[#C2410C] text-white' : 'text-gray-600 hover:bg-[#60A5FA] hover:text-[#C2410C]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <child.icon className="text-lg text-[#C2410C]" />
                    <span>{child.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default SidebarItem;




// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// const SidebarItem = ({ to, icon: Icon, label, isSidebarOpen, isActive, children, isLocked = false }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const hasChildren = children && children.length > 0;

//   const [open, setOpen] = useState(false);
//   const [showToast, setShowToast] = useState(false);

//   useEffect(() => {
//     const isChildActive = hasChildren && children.some((child) => location.pathname.startsWith(child.to));
//     setOpen(isChildActive);
//   }, [location.pathname]);

//   const handleClick = (e) => {
//     if (isLocked) {
//       e.preventDefault();
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 1500);
//       return;
//     }

//     if (hasChildren) setOpen((prev) => !prev);
//   };

//   const renderLink = (
//     <Link
//       to={isLocked ? "#" : to}
//       onClick={handleClick}
//       className={`flex items-center justify-between cursor-pointer rounded-md px-3 py-2 transition-all duration-300 ease-in-out ${
//         isActive(to) ? 'bg-[#C2410C] text-white' : 'hover:bg-[#60A5FA] hover:text-[#C2410C]'
//       }`}
//     >
//       <div className="flex items-center space-x-3">
//         <Icon className={`text-lg ${isActive(to) ? 'text-white' : 'text-[#C2410C]'}`} />
//         {isSidebarOpen && <span className="text-sm font-medium text-blue">{label}</span>}
//       </div>
//       {hasChildren && isSidebarOpen && (
//         <span>{open ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}</span>
//       )}
//     </Link>
//   );

//   return (
//     <li className="relative">
//       {hasChildren ? (
//         <div onClick={handleClick}>{renderLink}</div>
//       ) : (
//         renderLink
//       )}

//       {hasChildren && open && isSidebarOpen && (
//         <div className="ml-8 mt-1">
//           <ul className="space-y-1">
//             {children.map((child) => (
//               <li key={child.to}>
//                 <Link
//                   to={child.to}
//                   className={`block text-sm px-2 py-1 rounded-md transition duration-200 ${
//                     isActive(child.to)
//                       ? 'bg-[#C2410C] text-white'
//                       : 'text-gray-600 hover:bg-[#60A5FA] hover:text-[#C2410C]'
//                   }`}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <child.icon className="text-lg text-[#C2410C]" />
//                     <span>{child.label}</span>
//                   </div>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Toast Message */}
//       {showToast && (
//         <div className="absolute top-0 right-[-180px] bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow-lg z-50 text-sm">
//           Please subscribe first!
//         </div>
//       )}
//     </li>
//   );
// };

// export default SidebarItem;

