const cron = require('node-cron');
const mysql = require('../../database/index');
const {sendMessage} = require('./email.controller');

module.exports = () => {
    cron.schedule('0 0 23 * * *', async () =>{
        
        try {
            const [subscriptionsValid] = await mysql.execute('SELECT M.id as message_id, S.id as subscription_id, M.template_name, M.position, S.name, S.email, S.last_message FROM message_flow M JOIN subscriptions S ON M.position = S.last_message + 1 WHERE S.active = true;');

            for(const subscription of subscriptionsValid){
                await sendMessage({name: subscription.name, email: subscription.email}, subscription.template_name);
                await mysql.execute(`UPDATE subscriptions SET last_message = ? WHERE id = ?;`,[subscription.position, subscription.subscription_id]);
            }

            const [subscriptionsInvalid] = await mysql.execute('SELECT * FROM ecommerce.subscriptions WHERE last_message = (SELECT max(position) from ecommerce.message_flow) AND active = true;');
            
            for(const subscription of subscriptionsInvalid){
                await mysql.execute(`UPDATE subscriptions SET active = false WHERE id = ?;`,[subscription.id]);
            }
            
        } catch (error) {
            return;
        }
    }, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
    })
} 