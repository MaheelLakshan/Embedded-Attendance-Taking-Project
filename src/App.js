import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { app } from './firebaseConfiguration';
import * as XLSX from 'xlsx';
import './App.css';
import Photo from './Assert/Dashbord_photo.jpg';

function App() {
  const [firebaseData, setFirebaseData] = useState([]);
  const [excelData, setExcelData] = useState({});

  useEffect(() => {
    const database = getDatabase(app);
    const dataRef = ref(database, 'student1');

    const onDataChange = (snapshot) => {
      const data = snapshot.val();
      setExcelData(data);

      if (data) {
        const dataArray = Object.values(data); // Convert object values to array
        setFirebaseData(dataArray);
      } else {
        setFirebaseData([]); // Update the state to an empty array when data is cleared
      }
    };

    // Listen for real-time changes to the data
    const dataListener = onValue(dataRef, onDataChange);

    // Cleanup the listener when component unmounts
    return () => {
      if (dataListener) {
        dataListener();
      }
    };
  }, []);

  const generateExcel = () => {
    try {
      const formattedData = Object.values(excelData);
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Firebase Data');

      XLSX.writeFile(workbook, 'firebase_data.xlsx');
    } catch (error) {
      console.error('Error generating Excel:', error);
    }
  };

  const clearData = async () => {
    try {
      const database = getDatabase(app);
      const dataRef = ref(database, 'student1');
      await remove(dataRef);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <div>
          <div className="dashboard-top">
            <div>
              <div className="dashboard-text">
                <div className="header-container">
                  <h1 className="header">
                    Welcome to the Student Attendance System
                  </h1>
                </div>

                <div className="instructions">
                  <p>
                    After scanning IDs, click{' '}
                    <span className="highlight">"Download"</span> to get the
                    Attendance sheet And then, click <br />
                    <span className="highlight">"New Sheet"</span> to create a
                    new Attendance sheet
                  </p>
                </div>
                <div>
                  <button onClick={generateExcel} className="dashboard-button">
                    Generate Excel
                  </button>
                  {/* <button onClick={() => window.print()}>Print</button> */}
                  <button onClick={clearData} className="dashboard-button">
                    Clear Data
                  </button>
                </div>
              </div>
            </div>
            <img
              src={Photo}
              alt="Dashboard_Photo"
              className="dashboard-photo"
            />
          </div>
        </div>
        <div className="dashboard-card">
          <h2>Real Time Scanned Cards</h2>
          <div>
            {firebaseData.length === 0 ? (
              <p>No card has been scanned.</p>
            ) : (
              <div>
                <p>
                  Index Number: {firebaseData[firebaseData.length - 1]?.name}
                </p>
                <p>Age: {firebaseData[firebaseData.length - 1]?.age}</p>
                <p>Email: {firebaseData[firebaseData.length - 1]?.email}</p>
              </div>
            )}
          </div>
          {/* <div>
            {firebaseData.map((item, index) => (
              <div key={index}>
                <p>Index Number: {item.name}</p>
                <p>Age: {item.age}</p>
                <p>Email: {item.email.email}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
