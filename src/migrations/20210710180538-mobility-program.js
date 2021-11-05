export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('MobilityPrograms', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
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
		await queryInterface.addColumn('Applications', 'mobilityProgramId', {
			type: Sequelize.INTEGER,
			references: {
				model: 'MobilityPrograms',
				key: 'id',
			},
			onUpdate: 'RESTRICT',
			onDelete: 'RESTRICT',
		});
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable('MobilityPrograms');
		await queryInterface.removeColumn('Applications', 'mobilityProgramId');
	},
};
