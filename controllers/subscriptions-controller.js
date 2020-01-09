const router = require("express").Router();
const asyncWrapper = require("../utilities/async-wrapper").AsyncWrapper;
const subscriptionService = require("../services/subscriptions-service");

//GET api/subscriptions
router.get("/", asyncWrapper(async (req, res) => {
    let userId = 1;
    let subscriptions = await subscriptionService.findAll(userId);
    res.send(subscriptions);
}));

//GET api/subscriptions/:id
router.get("/:id",  asyncWrapper(async (req, res) => {
    let subscription =  await subscriptionService.findOne(req.params.id);
    res.send(subscription);
}));

//POST api/subscriptions
router.post("/",  asyncWrapper(async (req, res) => {
    let subscription =  await subscriptionService.create(req.body);
    res.send(subscription);
}));

//DELETE api/subscriptions/:id
router.delete("/:id",  asyncWrapper(async (req, res) => {
    let subscription =  await subscriptionService.deleteOne(req.params.id);
    res.sendStatus(200);
}));

module.exports = router;