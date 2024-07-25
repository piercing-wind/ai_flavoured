const { CronJob } = require('cron'); 

console.log('Starting the cron job');
const job = new CronJob('0 0 * * *', () => {
  const res = fetch('https://aiflavoured/api/scheduler', {
     method: 'GET',
     headers: {
        'Content-Type': 'application/json',
         'Authorization': "iloveai"
     }
  }).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
});
job.start();