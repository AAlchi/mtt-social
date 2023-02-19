// const express = require('express')
// const app = express();
// const dotenv = require('dotenv')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const User = require('./models/userModel.js')

// app.use(cors());
// dotenv.config();

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('Connected to the database.');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const userRouter = require('./routes/userRoutes.js')

// app.use('/', userRouter);

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
// })

// app.use((err, req, res, next) => {
//   res.status(500).send({ message: err.message });
// });



// const port = process.env.PORT || 5000
// app.listen(port, () => {
//     console.log(`Running on port ${port}`)
// })