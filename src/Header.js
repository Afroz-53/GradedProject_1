import React from 'react';

const Header = ({ title, date, professor, college, department, semester, group }) => {
  return (
    <div className="header">
      <h1>{title}</h1>
      <p>Date: {date}</p>
      <p>Professor: {professor}</p>
      <p>College: {college}</p>
      <p>Department: {department}</p>
      <p>Semester: {semester}</p>
      <p>Group: {group}</p>
      {/* Add more information if needed */}
    </div>
  );
};

export default Header;
