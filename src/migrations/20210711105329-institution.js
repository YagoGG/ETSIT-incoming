export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Institutions', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
			},
			code: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				default: true,
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
		await queryInterface.addColumn('Applications', 'homeInstitutionId', {
			type: Sequelize.INTEGER,
			references: {
				model: 'Institutions',
				key: 'id',
			},
			onDelete: 'RESTRICT',
		});
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable('Institutions');
		await queryInterface.removeColumn('Applications', 'homeInstitutionId');
	},
};
