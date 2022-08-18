const mongoose = require('mongoose');
const moment = require('moment');

const formatDate = (date) => {
    return moment(date).format('MMM Do, YYYY -- h:mm a');
};

