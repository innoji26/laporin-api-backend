const db = require("../models");
const User = db.user;
const Polisi = db.polisi;
const nanoid = require("nanoid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/authConfig.js");
const op = db.Sequelize.Op;

exports.register = (req, res) => {
    // Create a User
    const user = {
        id: req.body.id ? req.body.id : "user_" + nanoid.nanoid(15),
        name: req.body.name,
        noHp: req.body.noHp,
        nik: req.body.nik,
        alamat: req.body.alamat,
        ttl: req.body.ttl,
        password: bcrypt.hashSync(req.body.password),
        avatar: req.file ? req.file.filename : "default.png",
    };

    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            error: true,
            message: "Name can not be empty!",
        });
        return;
    }

    if (!req.body.noHp) {
        res.status(400).send({
            error: true,
            message: "No HP can not be empty!",
        });
        return;
    }

    if (!req.body.nik) {
        res.status(400).send({
            error: true,
            message: "NIK can not be empty!",
        });
        return;
    }
    if (!req.body.alamat) {
        res.status(400).send({
            error: true,
            message: "Alamat can not be empty!",
        });
        return;
    }
    
    if (!req.body.ttl) {
        res.status(400).send({
            error: true,
            message: "TTL can not be empty!",
        });
        return;
    }


    if (!req.body.password) {
        res.status(400).send({
            error: true,
            message: "Password can not be empty!",
        });
        return;
    }

    // Save User in the database
    User.create(user)
        .then((data) => {
            res.send({
                error: false,
                message: "Success create usser",
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: err.message,
            });
        });
};

exports.login = (req, res) => {
    const noHp = req.body.noHp;
    const password = req.body.password;

    if (!noHp) {
        res.status(400).send({
            error: true,
            message: "NoHp can not be empty!",
        });
        return;
    }

    if (!password) {
        res.status(400).send({
            error: true,
            message: "Password can not be empty!",
        });
        return;
    }

    User.findOne()
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    error: true,
                    message: "User Not found.",
                });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    error: true,
                    accessToken: null,
                    message: "Invalid Password!",
                });
            }

            const token = jwt.sign({
                    name: user.name,
                },
                authConfig.secretKey, {
                    expiresIn: 2592000 , // 24 hours
                }
            );

            req.session.token = token;

            res.status(200).send({
                error: false,
                message: "Success login",
                loginResult: {
                    userId: user.id,
                    name: user.name,
                    noHp: user.noHp,
                    nik: user.nik,
                    alamat: user.alamat,
                    ttl: user.ttl,
                    accessToken: token,
                },
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: err.message,
            });
        });
};

exports.registerPolisi = (req, res) => {
    // Create a User Polisi
    const polisi = {
        id: req.body.id ? req.body.id : "polisi_" + nanoid.nanoid(15),
        name: req.body.name,
        noHp: req.body.noHp,
        nik: req.body.nik,
        pangkat: req.body.pangkat,
        noNrp: req.body.noNrp,
        jabatan: req.body.jabatan,
        password: bcrypt.hashSync(req.body.password),
        avatar: req.file ? req.file.filename : "default.png",
    };

    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            error: true,
            message: "Name can not be empty!",
        });
        return;
    }

    if (!req.body.noHp) {
        res.status(400).send({
            error: true,
            message: "No HP can not be empty!",
        });
        return;
    }

    if (!req.body.nik) {
        res.status(400).send({
            error: true,
            message: "NIK can not be empty!",
        });
        return;
    }
    if (!req.body.pangkat) {
        res.status(400).send({
            error: true,
            message: "Pangkat can not be empty!",
        });
        return;
    }
    
    if (!req.body.noNrp) {
        res.status(400).send({
            error: true,
            message: "NoNrp can not be empty!",
        });
        return;
    }

    if (!req.body.jabatan) {
        res.status(400).send({
            error: true,
            message: "Jabatan can not be empty!",
        });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({
            error: true,
            message: "Password can not be empty!",
        });
        return;
    }

    // Save User Polisi in the database
    Polisi.create(polisi)
        .then((data) => {
            res.send({
                error: false,
                message: "Success create user polisi",
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: err.message,
            });
        });
};

exports.loginPolisi = (req, res) => {
    const noNrp = req.body.noNrp;
    const password = req.body.password;

    if (!noNrp) {
        res.status(400).send({
            error: true,
            message: "NoNrp can not be empty!",
        });
        return;
    }

    if (!password) {
        res.status(400).send({
            error: true,
            message: "Password can not be empty!",
        });
        return;
    }

    Polisi.findOne()
        .then((polisi) => {
            if (!polisi) {
                return res.status(404).send({
                    error: true,
                    message: "User Polisi Not found.",
                });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                polisi.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    error: true,
                    accessToken: null,
                    message: "Invalid Password!",
                });
            }

            const token = jwt.sign({
                    name: polisi.name,
                },
                authConfig.secretKey, {
                    expiresIn: 2592000 , // 24 hours
                }
            );

            req.session.token = token;

            res.status(200).send({
                error: false,
                message: "Success login",
                loginResult: {
                    userId: polisi.id,
                    name: polisi.name,
                    noHp: polisi.noHp,
                    nik: polisi.nik,
                    pangkat: polisi.pangkat,
                    noNrp: polisi.noNrp,
                    jabatan: polisi.jabatan,
                    accessToken: token,
                },
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: err.message,
            });
        });
};

exports.logout = (req, res) => {
    req.session = null;
    res.send({
        error: false,
        message: "Success logout",
    });
};