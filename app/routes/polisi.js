module.exports = (app) => {
    const polisi = require("../controllers/polisi.js");
    const { authJwt } = require("../middleware");
    const uploadFile = require("../middleware/upload");

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    // Retrieve all polisi
    app.get("/api/polisi/", [authJwt.verifyToken], polisi.getAllPolisi);

    app.get("/api/polisi/:id", [authJwt.verifyToken], polisi.getPolisiById);

    app.put(
        "/api/polisi/:id", [authJwt.verifyToken, uploadFile.single("avatar")],
        polisi.updatePolisiById
    );

    app.delete("/api/polisi/:id", [authJwt.verifyToken], polisi.deletePolisiById);
};