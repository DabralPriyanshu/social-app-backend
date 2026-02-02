const express = require("express");
const v1Routes = require("./v1/index");
const apiRoutes = express.Router();
//if after /api  /v1 will be present in the endpoint request will be pass to v1Routes
apiRoutes.use("/v1", v1Routes);
module.exports = apiRoutes;
