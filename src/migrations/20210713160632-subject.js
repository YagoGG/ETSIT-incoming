export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Subjects', {
			code: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				unique: true,
			},
			nameNative: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			nameEnglish: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			ects: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
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
		await queryInterface.dropTable('Subjects');
	},
};
