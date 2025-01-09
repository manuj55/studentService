const express = require('express');
const dontenv = require('dotenv');

//connect to database
const connectDB = require('./config/db');
const studentRoute = require('./routes/studentRoute');

dontenv.config();


//initialize express
const app = express();


//middleware
app.use(express.json());


//routes
app.use('/api/students', studentRoute);

// app.get('/students', (req, res) => {
//     res.json({
//         message: 'Student Service'
//     });
// });

// app.post('/students', (req, res) => {
//     console.log(req.body);
//     res.send('POST request to the homepage')

// });




//strat server
const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});