const axios = require("axios");
const Subscription = require("../models/index")["Subscription"];
const ValidationError = require("../../errors/validation-error");
const AmqpService = require("./amqp-service");

module.exports = class SubscriptionService {
    constructor() {
        this.amqpService = new AmqpService(process.env.AMQP_CONNECTION_STRING, process.env.AMQP_CHANNEL_NAME, process.env.AMQP_QUEUE_NAME);
    }

    async findAll(userId){
        return await Subscription.findAll({where : {userId}});
    }

    async findAll(id){
        return await Subscription.findOne({where : {id}});
    }

    async create(subscription){
        let response = axios.default.get(`http://localhost:3001/${subscripion.planId}`);
        await this.amqpService.init();
        let plan = (await response).data;
        if(!plan) {
            throw new ValidationError("given plan is invalid");
        }
        subscription = await Subscription.create(subscription);
        return await this.amqpService.send(JSON.stringify({plan, subscripion}));
    }

    async deleteOne(id){
        return await Subscription.destroy({where : {id}});
    }
}