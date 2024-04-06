import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [students, setStudents] = useState([
    { number: 1, name: 'John Doe', ticketNumber: '12345', ratingGrade: 'A', examGrade: 85, finalGrade: 89, status: 'Passed' },
    { number: 2, name: 'Afroz', ticketNumber: '54321', ratingGrade: 'B', examGrade: 78, finalGrade: 82, status: 'Failed' },
    { number: 3, name: 'Meghana', ticketNumber: '98765', ratingGrade: 'A+', examGrade: 92, finalGrade: 94, status: 'Passed' },
    { number: 4, name: 'Shaku', ticketNumber: '45678', ratingGrade: 'B-', examGrade: 72, finalGrade: 76, status: 'Failed' },
    { number: 5, name: 'Sai', ticketNumber: '65432', ratingGrade: 'C', examGrade: 65, finalGrade: 68, status: 'Failed' }
  ]);

  const [filterOption, setFilterOption] = useState('All');
  const [sortOption, setSortOption] = useState('Alphabetic Order');
  const [showStatistics, setShowStatistics] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const toggleStatistics = () => {
    setShowStatistics(!showStatistics);
  };

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleDetailsClick = (student) => {
    // Show details for the student (e.g., pop-up modal)
    console.log('Details clicked for:', student);
  };

  let sortedStudents = [...students];

  if (sortOption === 'Alphabetic Order') {
    sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'Asc by Final Grade') {
    sortedStudents.sort((a, b) => a.finalGrade - b.finalGrade);
  } else if (sortOption === 'Desc by Final Grade') {
    sortedStudents.sort((a, b) => b.finalGrade - a.finalGrade);
  }

  let filteredStudents = sortedStudents;

  if (filterOption === 'Passed') {
    filteredStudents = students.filter(student => student.status === 'Passed');
  } else if (filterOption === 'Failed') {
    filteredStudents = students.filter(student => student.status === 'Failed');
  }

  const totalStudents = students.length;
  const passedStudents = students.filter(student => student.status === 'Passed').length;
  const failedStudents = students.filter(student => student.status === 'Failed').length;
  const averageGrade = students.reduce((total, student) => total + student.finalGrade, 0) / totalStudents;
  const maxGrade = Math.max(...students.map(student => student.finalGrade));
  const minGrade = Math.min(...students.map(student => student.finalGrade));

  return (
    <div className="App">
      <header>
        <h1>Exam Information</h1>
      </header>
      <div className="main-block">
        <div className="options">
          <label htmlFor="filter">Filter:</label>
          <select id="filter" value={filterOption} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
          </select>

          <label htmlFor="sort">Sort:</label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="Alphabetic Order">Alphabetic Order</option>
            <option value="Asc by Final Grade">Asc by Final Grade</option>
            <option value="Desc by Final Grade">Desc by Final Grade</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Ticket's Number</th>
              <th>Rating Grade</th>
              <th>Exam Grade</th>
              <th>Final Grade</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(index)}
                className={selectedRow === index ? 'selected' : ''}
              >
                <td>{student.number}</td>
                <td>{student.name}</td>
                <td>{student.ticketNumber}</td>
                <td>{student.ratingGrade}</td>
                <td>{student.examGrade}</td>
                <td>{student.finalGrade}</td>
                <td>{student.status}</td>
                <td><button onClick={() => handleDetailsClick(student)}>Show Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={toggleStatistics}>
          {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
        </button>

        {showStatistics && (
          <div className="statistics-block">
            <h2>Statistics</h2>
            <p>Total number of students: {totalStudents}</p>
            <p>Number of passed students: {passedStudents}</p>
            <p>Number of failed students: {failedStudents}</p>
            <p>Average grade: {averageGrade}</p>
            <p>Maximum grade: {maxGrade}</p>
            <p>Minimum grade: {minGrade}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
