const Sequelize = require("sequelize");
const config = require("../config/dbConfig.js")

const database = new Sequelize(config.db, config.user, config.pass, {
    host: config.host,
    dialect: config.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = database;

module.exports = db;

// define semua models yang ada pada aplikasi
db.user = require("./user.js")(database, Sequelize);
db.laporan = require("./laporan.js")(database, Sequelize);
db.polisi = require("./polisi.js")(database, Sequelize);

db.user.hasMany(db.laporan, { foreignKey: "idUser" });
db.laporan.belongsTo(db.user, { foreignKey: "idUser" });


module.exports = db;