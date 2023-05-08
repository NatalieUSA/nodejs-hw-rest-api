const { app } = require('./app');

// app.listen(3333, () => {
//   console.log('Server running. Use our API on port: 3333');
// });
const PORT = 3000;

app.listen(PORT, () => {
  console.log(
    `Server running. Use our API on port: 3000  http://localhost:${PORT}`
  );
});
