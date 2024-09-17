const express = require('express');
const bodyParser = require('body-parser');
const httpStatus = require('http-status');
const cors = require('cors');
const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middlewares/error');

const routesV1 = require('./routes/v1');

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors());
app.options('*', cors());

app.use('/v1', routesV1);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});


app.use(errorConverter);
app.use(errorHandler);

module.exports = app;