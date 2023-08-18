const db = require("../models");
const User = db.user;
const fs = require("fs");

// Retrieve all Users from the database.
exports.getAllUser = (req, res) => {
    User.findAll()
        .then((data) => {
            res.send({
                error: false,
                message: "Success",
                user: data,
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: err.message || "Some error occurred while retrieving users.",
            });
        });
};

// Find a single User with an id
exports.getUserById = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    error: true,
                    message: "Not found User with id " + id,
                });
            } else {
                res.send({
                    error: false,
                    message: "Success",
                    user: data,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: "Error retrieving User with id=" + id,
            });
        });
};

// Update a User by the id in the request
exports.updateUserById = (req, res) => {
    const id = req.params.id;
    const avatar = req.file ? req.file.filename : User.avatar;
    const name = req.body.name;
    const alamat = req.body.alamat;
    const ttl = req.body.ttl

    User.findOne({
        where: {
            id: id,
        },
    }).then((user) => {
        if (!user) {
            res.status(404).send({
                error: true,
                message: "Not found User with id " + id,
            });
        } 

        const oldAvatar = user.avatar

        User.update({ avatar: avatar, name: name , alamat: alamat, ttl: ttl}, {
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
                    message: "User was updated successfully.",
                });
            } else {
                res.send({
                    error: true,
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: "Error updating User with id=" + id,
            });
        });
    });
};

// Delete a User with the specified id in the request
exports.deleteUserById = (req, res) => {
    const id = req.params.id;

    User.findOne({
        where: {
            id: id,
        },
    }).then((user) => {
        
        const oldAvatar = user.avatar

        User.destroy({
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
                        message: "User was deleted successfully!",
                    });
                } else {
                    res.send({
                        error: true,
                        message: `Cannot delete User with id=${id}. Maybe User was not found!`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    error: true,
                    message: "Could not delete User with id=" + id,
                });
            });
    });
};