module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
			},
			email: {
				type: Sequelize.DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isEmail: true,
				},
			},
			passwordHash: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: Sequelize.DataTypes.STRING,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable('Users');
	},
};
