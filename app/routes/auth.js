module.exports = (app) => {
    const auth = require("../controllers/auth.js");
    const { verifySignUp } = require("../middleware");
    const uploadFile = require("../middleware/upload");

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    // register
    app.post(
        "/api/auth/signup/", [uploadFile.single("avatar"), verifySignUp.checkDuplicateNoHpOrNIK],
        auth.register
    );

    //login
    app.post("/api/auth/signin/", auth.login);

     // register polisi
     app.post(
        "/api/auth/signuppolisi/", [uploadFile.single("avatar"), verifySignUp.checkDuplicateNoNrpOrNIK],
        auth.registerPolisi
    );

    //login polisi
    app.post("/api/auth/signinpolisi/", auth.loginPolisi);

    //logout
    app.post("/api/auth/logout/", auth.logout);
};