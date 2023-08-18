const db = require("../models");
const User = db.user;
const Polisi = db.polisi;

checkDuplicateNoHpOrNIK = (req, res, next) => {
    User.findOne({
        where: {
            noHp: req.body.noHp ? req.body.noHp : null,
        },
    }).then((user) => {
        if (user) {
            res.status(400).send({
                error: true,
                message: "Failed! NoHp is already in use!",
            });
            return;
        }

        User.findOne({
            where: {
                nik: req.body.nik ? req.body.nik : null,
            },
        }).then((user) => {
            if (user) {
                res.status(400).send({
                    error: true,
                    message: "Failed! NIK is already in use!",
                });
                return;
            }

            next();
        });
    });
};

checkDuplicateNoNrpOrNIK = (req, res, next) => {
    Polisi.findOne({
        where: {
            noNrp: req.body.noNrp ? req.body.noNrp : null,
        },
    }).then((polisi) => {
        if (polisi) {
            res.status(400).send({
                error: true,
                message: "Failed! NoNrp is already in use!",
            });
            return;
        }

        Polisi.findOne({
            where: {
                nik: req.body.nik ? req.body.nik : null,
            },
        }).then((polisi) => {
            if (polisi) {
                res.status(400).send({
                    error: true,
                    message: "Failed! NIK is already in use!",
                });
                return;
            }

            next();
        });
    });
};

const verifySignUp = {
    checkDuplicateNoHpOrNIK: checkDuplicateNoHpOrNIK,
    checkDuplicateNoNrpOrNIK: checkDuplicateNoNrpOrNIK,

};

module.exports = verifySignUp;