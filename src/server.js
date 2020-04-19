const { PORT } = require('./common/config');
const { app, connectDB } = require('./app');

connectDB(() => {
  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
  });
});
