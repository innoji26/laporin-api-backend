const { application } = require("express");

module.exports = (app) => {
    const laporan = require("../controllers/laporan.js");
    const { authJwt } = require("../middleware");
    const uploadFile = require("../middleware/upload");

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    // Retrieve all laporan
    app.get("/api/laporan/", [authJwt.verifyToken], laporan.getAllLaporan);

    app.get("/api/laporan/:id", [authJwt.verifyToken], laporan.getLaporanById);

    app.get("/api/laporanuser/:idUser", [authJwt.verifyToken], laporan.getAllLaporanByUserId);

    app.post(
        "/api/laporan/", [authJwt.verifyToken, uploadFile.single("image")],
        laporan.addLaporan
    );

    app.put(
        "/api/laporan/:id", [authJwt.verifyToken, uploadFile.single("image")],
        laporan.updateLaporanById
    );

    app.delete("/api/laporan/:id", [authJwt.verifyToken], laporan.deleteLaporanById);

};