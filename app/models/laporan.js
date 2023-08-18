module.exports = (sequelize, DataType) => {
    const Laporan = sequelize.define(
        "laporan", {
            id: {
                type: DataType.STRING,
                primaryKey: true,
                autoIncrement: false,
            },
            idUser: {
                type: DataType.STRING,
            },
            title: {
                type: DataType.STRING,
            },
            name: {
                type: DataType.STRING,
            },
            noHp: {
                type: DataType.STRING,
            },
            description: {
                type: DataType.STRING,
            },
            image: {
                type: DataType.STRING,
            },
            tanggalKejadian: {
                type: DataType.STRING,
            },
            lat: {
                type: DataType.DOUBLE,
            },
            lon: {
                type: DataType.DOUBLE,
            },
            statusLaporan: {
                type: DataType.STRING,
            },
            
        }, {
            freezeTableName: true,
        }
    );
    return Laporan;
};