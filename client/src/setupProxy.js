const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        ["/api", "/auth/google", "/api/login"],
        createProxyMiddleware({
            target: "http://localhost:5000",
            secure: false
        })
    );
};