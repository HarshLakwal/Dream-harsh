const cron = require('cron');
const createJob = (time, task) => {
    return new cron.CronJob(time, function () {
        task()
    })
}
module.exports = {
    createJob
}