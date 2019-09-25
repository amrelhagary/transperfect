'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
const port = process.env.PORT || '3000';

app.use('/api', require('./routes/v1'));
app.use('/api/v1', require('./routes/v1'));


app.listen(port, () => console.log(`Server Listening on port ${port}`));
