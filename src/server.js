require('dotenv').config();

const app = require('./app');
const PORT = process.env.PORT || 3333
require('./app/controllers/cron-job.controller')();

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});