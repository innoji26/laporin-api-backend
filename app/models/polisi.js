
module.exports = (sequelize, DataType) => {
    const Polisi = sequelize.define(
        "polisi", {
            id: {
                type: DataType.STRING,
                primaryKey: true,
                autoIncrement:false
            },
            name: {
                type: DataType.STRING,
            },
            noHp: {
                type: DataType.STRING,
            },
            nik: {
                type: DataType.STRING,
            },
            pangkat: {
                type: DataType.STRING,
            },
            noNrp: {
                type: DataType.STRING,
            },
            jabatan: {
                type: DataType.STRING,
            },
            password: {
                type: DataType.STRING,
            },
            avatar: {
                type: DataType.STRING,
            },
        }, {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Polisi;
};