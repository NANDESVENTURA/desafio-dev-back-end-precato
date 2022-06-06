const {Router} = require('express');

const subscriptionController = require(`./app/controllers/subscription.controller`);
const messageFlowController = require(`./app/controllers/message-flow.controller`);

const router = new Router();

router.get('/', (req, res)=>{
    res.send("Welcome to my home page");
})


router.get(`/subscriptions/list`, subscriptionController.list);
router.get(`/subscriptions/get/:id`, subscriptionController.get);
router.post(`/subscriptions/create`, subscriptionController.create);
router.patch(`/subscriptions/update/:id`, subscriptionController.update);
router.delete(`/subscriptions/delete/:id`, subscriptionController.delete);

router.get(`/message/list`, messageFlowController.list);
router.get(`/message/get/:id`, messageFlowController.get);
router.post(`/message/create`, messageFlowController.create);
router.patch(`/message/update/:id`, messageFlowController.update);
router.delete(`/message/delete/:id`, messageFlowController.delete);



module.exports = router;