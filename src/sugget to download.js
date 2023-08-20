// const express = require('express');
// const app = express();
// const exceljs = require('exceljs');

// // Sample data retrieved from Firebase (replace this with your data retrieval logic)
// const firebaseData = [
//   { name: 'John', age: 30, email: 'john@example.com' },
//   // ... more data ...
// ];

// app.get('/generate-excel', (req, res) => {
//   const workbook = new exceljs.Workbook();
//   const worksheet = workbook.addWorksheet('Sheet 1');

//   // Add header row
//   worksheet.addRow(['Name', 'Age', 'Email']);

//   // Add data rows
//   firebaseData.forEach(item => {
//     worksheet.addRow([item.name, item.age, item.email]);
//   });

//   // Save workbook to a file
//   const filePath = 'path/to/generated/excel.xlsx';
//   workbook.xlsx.writeFile(filePath)
//     .then(() => {
//       res.download(filePath, 'firebase_data.xlsx'); // Provide a downloadable link
//     })
//     .catch(error => {
//       console.error('Error generating Excel:', error);
//       res.status(500).send('Error generating Excel');
//     });
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
