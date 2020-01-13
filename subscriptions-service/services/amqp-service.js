const ampqlib = require("amqplib");

module.exports = class AmqpService {
    constructor(connectionString, channelName, queueName) {
        this.connectionString = connectionString;
        this.channelName = channelName;
        this.queueName = queueName;
        this.connection = null;
        this.channel =  null;
    }

    async init() {
        if(this.connection && this.channel){
            return;
        }
        this.connection = await ampqlib.connect(this.connectionString);
        this.channel = await this.connection.createChannel(this.channelName);
        return await this.channel.assertQueue(this.queueName);
    }

    async send(msg){
        return this.channel.sendToQueue(this.queueName, Buffer.from(msg));
    }
}