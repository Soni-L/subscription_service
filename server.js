const express =  require("express");
const dotenv = require("dotenv");
const Middleware = require("./middleware/middleware");

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

const PlansController = require("./controllers/plans-controller");
const SubscriptionsController = require("./controllers/subscriptions-controller");

Middleware(app);

app.use("/api/plans", PlansController);
app.use("/api/subscriptions", SubscriptionsController);

app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});