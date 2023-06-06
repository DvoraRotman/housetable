
import Sequelize from 'sequelize';
const sequelize = new Sequelize('mysql', 'root', '1234', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

const House = sequelize.define('house', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    currentValue: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    loanAmount: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    risk: {
        type: Sequelize.DOUBLE,
        allowNull: true
    }
});

(async () => {
    await sequelize.sync();
})();

export const houses = {

    getHouse: async (id) => {
        const house = await House.findOne({ where: { id } });
        return house ? house.toJSON() : null;
    },
    setHouse: async (newHouse) => {

        const house = await House.create(newHouse);
        return house.toJSON();
    },
    getNewId: async () => {

        const result = await House.max('id');
        const maxId = result + 1 || 1;
        return maxId;
    },
    updateHouseDB: async (body) => {
        const house = await House.findOne({ where: { id: body?.id } });
        if (house) {
            await house.update(body);
        }
    }
};