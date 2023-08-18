const db = require("../models");
const Polisi = db.polisi;
const fs = require("fs");

// Retrieve all Polisi from the database.
exports.getAllPolisi = (req, res) => {
    Polisi.findAll()
        .then((data) => {
            res.send({
                error: false,
                message: "Success",
                polisi: data,
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: err.message || "Some error occurred while retrieving polisi.",
            });
        });
};

// Find a single Polisi with an id
exports.getPolisiById = (req, res) => {
    const id = req.params.id;

    Polisi.findByPk(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    error: true,
                    message: "Not found Polisi with id " + id,
                });
            } else {
                res.send({
                    error: false,
                    message: "Success",
                    polisi: data,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: "Error retrieving Polisi with id=" + id,
            });
        });
};

// Update a Polisi by the id in the request
exports.updatePolisiById = (req, res) => {
    const id = req.params.id;
    const avatar = req.file ? req.file.filename : User.avatar;
    const name = req.body.name;
    const pangkat = req.body.pangkat;
    const jabatan = req.body.jabatan;

    Polisi.findOne({
        where: {
            id: id,
        },
    }).then((polisi) => {
        if (!polisi) {
            res.status(404).send({
                error: true,
                message: "Not found Polisi with id " + id,
            });
        } 

        const oldAvatar = polisi.avatar

        Polisi.update({ avatar: avatar, name: name , pangkat: pangkat, jabatan: jabatan}, {
            where: { id: id },
        })
        .then((num) => {
            if (oldAvatar !== "default.png" && oldAvatar !== avatar) {
                    const directoryPath =
                        __dirname + "/../public/uploads/" + oldAvatar;
                    fs.unlink(directoryPath, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
            }
            if (num == 1) {
                res.send({
                    error: false,
                    message: "Polisi was updated successfully.",
                });
            } else {
                res.send({
                    error: true,
                    message: `Cannot update Polisi with id=${id}. Maybe Polisi was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: "Error updating Polisi with id=" + id,
            });
        });
    });
};

// Delete a Polisi with the specified id in the request
exports.deletePolisiById = (req, res) => {
    const id = req.params.id;

    Polisi.findOne({
        where: {
            id: id,
        },
    }).then((user) => {
        
        const oldAvatar = user.avatar

        Polisi.destroy({
                where: { id: id },
            })
            .then((num) => {
                if (num == 1) {
                    if (oldAvatar !== "default.png") {
                        const directoryPath =
                            __dirname + "/../public/uploads/" + oldAvatar;
                        fs.unlink(directoryPath, (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    }
                    res.send({
                        error: false,
                        message: "Polisi was deleted successfully!",
                    });
                } else {
                    res.send({
                        error: true,
                        message: `Cannot delete Polisi with id=${id}. Maybe Polisi was not found!`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    error: true,
                    message: "Could not delete Polisi with id=" + id,
                });
            });
    });
};