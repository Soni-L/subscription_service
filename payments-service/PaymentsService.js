const ampqlib = require("amqplib");

module.exports = class PaymentsService {
    constructor(connectionString, channelName, queueName) {
        this.connectionString = connectionString;
        this.channelName = channelName;
        this.queueName = queueName;
        this.connection = null;
        this.channel =  null;
    }

    async init() {
        console.log(`Initializing RabbitMQ connection to ${this.connectionString}`);
        this.connection = await ampqlib.connect(this.connectionString);
        this.channel = await this.connection.createChannel(this.channelName);
        await this.channel.assertQueue(this.queueName);
        await this.channel.consume(this.queueName, this.onMessageReceived.bind(this));
    }

    onMessageReceived(message){
        let contents = message.content.toString();
        let parsed = JSON.parse(contents);
        if(parsed.subscriptions && parsed.plan){
            let {subscription, plan} = parsed;
            console.log(`Changing card ${subscription.cardNumber} with ${plan.price}`);
            this.channel.ack(message);
        }
        else {
            console.log("Invalid payload. Aborting...");
        }
    }
}

