const express =  require("express");
const Middleware = require("../middleware/middleware");
const ErrorHandlingMiddleware = require("../middleware/error-handling");

dotenv.config();
const PORT = process.env.PORT;

const app = express();

const PlansController = require("./controllers/plans-controller");

Middleware(app);

app.use("", PlansController);

//Error middleware must be defined after all other middleware
ErrorHandlingMiddleware(app);

app.listen(PORT, () => {
   console.log(`Plans service is listening on port ${PORT}`);
});