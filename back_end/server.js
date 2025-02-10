const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json())
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const cors = require('cors')

const allowedOrigins = [
    "http://localhost:5173",
    "https://your-other-origin.com", 
  ];

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );


const usersRoute = require('./routes/usersRoute');
const moviesRoute = require('./routes/moviesRoute');
const theatresRoute = require('./routes/theatresRoute');
const bookingsRoute = require('./routes/bookingsRoute');

app.use(cookieParser())
app.use("/users", usersRoute);
app.use("/movies", moviesRoute);
app.use("/theatres", theatresRoute);
app.use("/bookings", bookingsRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`NodeJS Server is running on PORT ${port}`));