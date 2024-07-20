require('dotenv').config();
// check origin url
const cors = require('cors');
// Show status (post,get,path,delete)
const morgan = require('morgan');

const express = require('express');
const authRouter = require('./routes/auth-route');
const errorMiddleware = require('./middlewares/error');
const authenticate = require('./middlewares/authenticate');
const locationRouter = require('./routes/location-route');
const categoryController = require('./controllers/category-controller');
const postRouter = require('./routes/post-route');
const relationRouter = require('./routes/relation-route');
const app = express();

// Set middleware
app.use(cors());
app.use(morgan('dev'));
// convert JSON to object
app.use(express.json());

// Set path
app.use('/auth', authRouter);
app.use('/locations', locationRouter);
app.use('/categorys', categoryController.getCategory);
app.use('/posts', authenticate, postRouter);
app.use('/relations', authenticate, relationRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running on port:${PORT}`));
