const db = require("../models");
const Laporan = db.laporan;
const fs = require("fs");
const nanoid = require("nanoid");
const { title } = require("process");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Laporan
exports.addLaporan = (req, res) => {
    // Create a Laporan
    const laporan = {
        id: req.body.id ? req.body.id : "laporan_" + nanoid.nanoid(15),
        idUser: req.body.idUser,
        title: req.body.title,
        name: req.body.name,
        noHp: req.body.noHp,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
        tanggalKejadian: req.body.tanggalKejadian,
        lat: req.body.lat,
        lon: req.body.lon,
        statusLaporan: req.body.statusLaporan,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    // Validate request
    if (!laporan.title) {
        res.status(400).send({
            error: true,
            message: "Title can not be empty!",
        });
        return;
    }

    if (!laporan.description) {
        res.status(400).send({
            error: true,
            message: "description can not be empty!",
        });
        return;
    }

    if (!laporan.image) {
        res.status(400).send({
            error: true,
            message: "Image can not be empty!",
        });
        return;
    }

    // Save Laporan in the database
    Laporan.create(laporan)
        .then((data) => {
            res.send({
                error: false,
                message: "Success",
                laporan: data,
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: err.message || "Some error occurred while creating the Laporan.",
            });
        });
};

// Retrieve all Laporan from the database.
exports.getAllLaporan = (req, res) => {
    Laporan.findAll({
            order: [
                ["createdAt", "DESC"]
            ],
        })
        .then((data) => {
            res.send({
                error: false,
                message: "Success",
                laporan: data,
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: err.message || "Some error occurred while retrieving laporan.",
            });
        });
};

exports.getAllLaporanByUserId = (req, res) => {
    const idUser = req.params.idUser

    Laporan.findAll({
            where: {
                idUser: idUser
            },
        })
        .then((data) => {
            res.send({
                error: false,
                message: "Success",
                laporan: data,
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: err.message || "Some error occurred while retrieving laporan.",
            });
        });
};

exports.getLaporanById = (req, res) => {
    const id = req.params.id;

    Laporan.findOne({
            where: {
                id: id,
            },
            include: [{
                model: User,
                as: "user",
                attributes: {
                    exclude: ["password"],
                },
            }, ],
        })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    error: true,
                    message: "Not found Laporan with id " + id,
                });
            } else {
                res.send({
                    error: false,
                    message: "Success",
                    laporan: data,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: "Error retrieving Laporan with id=" + id,
            });
        });
};

exports.updateLaporanById = (req, res) => {
    const id = req.params.id;
    const statusLaporan = req.body.statusLaporan;

    Laporan.findOne({
        where: {
            id: id,
        },
    }).then((laporan) => {
        if (!laporan) {
            res.status(404).send({
                error: true,
                message: "Not found Laporan with id " + id,
            });
        } else {
            Laporan.update({
                    statusLaporan: statusLaporan,
                    updatedAt: new Date(),
                }, {
                    where: {
                        id: id,
                    },
                })
                .then((num) => {
                    if (num == 1) {
                        res.send({
                            error: false,
                            message: "Laporan was updated successfully.",
                        });
                    } else {
                        res.send({
                            error: true,
                            message: `Cannot update Laporan with id=${id}. Maybe Laporan was not found`,
                        });
                    }
                })
                .catch((err) => {
                    res.status(500).send({
                        error: true,
                        message: "Error updating Laporan with id=" + id,
                    });
                });
        }
    });
};

exports.deleteLaporanById = (req, res) => {
    const id = req.params.id;

    Laporan.findOne({
        where: {
            id: id,
        },
    }).then((laporan) => {
        Laporan.destroy({
            where: {
                id: id,
            },
        }).then((num) => {
            if (num == 1) {
                const directoryPath = __dirname + "/../public/uploads/" + laporan.image;
                fs.unlink(directoryPath, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
                res.send({
                    error: false,
                    message: "Laporan was deleted successfully!",
                });
            } else {
                res.send({
                    error: true,
                    message: `Cannot delete Laporan with id=${id}. Maybe Laporan was not found!`,
                });
            }
        });
    });
};

