
module.exports = (sequelize, DataType) => {
    const User = sequelize.define(
        "user", {
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
            alamat: {
                type: DataType.STRING,
            },
            ttl: {
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
    )
    return User;
}