require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');
const cron = require('node-cron');
const tasks = require('./tasks');

const app = express();
process.env.TZ = "Asia/Jakarta";

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.urlencoded({extended: true}));

cron.schedule('* * * * *', async () => {
    try {
        await tasks.eventStatus();
    } catch (error) {
        console.log('ERROR: ', error.message);
    }
});

app.use('/api/v1', router);

app.get('/', (req, res) => {
    const ip_addr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.render('welcome', { ip_addr });
});

app.use((req, res, next) => {
    return res.status(404).json({
        status: 'NOT FOUND',
        message: 'Resource not found!',
        data: null
    });
});

app.use((err, req, res, next) => {
    return res.status(500).json({
        status: 'INTERNAL SERVER ERROR',
        message: err.message,
        data: null
    });
});


module.exports = app;