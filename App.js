import React, { useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';

function UserInfoPage() {
  // State to keep track of whether the current user is an admin
  const [isAdmin, setIsAdmin] = useState(true);
  // State to keep track of which shift managers have scheduling permissions
  const [shiftManagers, setShiftManagers] = useState([
    { name: 'Sharan Sivakumar', hasPermission: true },
    { name: 'Jon Tolkad', hasPermission: false },
    { name: 'Tom Carsello', hasPermission: true },
    {name: 'Matt Hiat', hasPermission: false},
  ]);

  // Event handler to toggle scheduling permissions for a shift manager
  const handlePermissionToggle = (index) => {
    // Make a copy of the shift managers array
    const newShiftManagers = [...shiftManagers];
    // Toggle the hasPermission property for the selected shift manager
    newShiftManagers[index].hasPermission = !newShiftManagers[index].hasPermission;
    // Update the shiftManager's state with the new array
    setShiftManagers(newShiftManagers);
  };

  return (
    <div className="User Information">
      <h1>Scheduling Permissions</h1>
      {isAdmin && (
        <ul>
          {/* Map over the shift managers array to display each one */}
          {shiftManagers.map((manager, index) => (
            <li key={index}>
              {/* Show the name of the manager and a switch to change their permission status */}
              {manager.name}:
              <input
                type="checkbox"
                checked={manager.hasPermission}
                onChange={() => handlePermissionToggle(index)}
              />
            </li>
          ))}
        </ul>
      )}
      {!isAdmin && <p>Apologies, you do not have the correct permission to view this page.</p>}
    </div>
  );
}

export default UserInfoPage;
