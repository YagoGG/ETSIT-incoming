export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('ApplicationSubjects', {
			SubjectCode: {
				type: Sequelize.INTEGER,
				references: { model: 'Subjects', key: 'code' },
				onDelete: 'RESTRICT',
			},
			ApplicationId: {
				type: Sequelize.INTEGER,
				references: { model: 'Applications', key: 'id' },
				onDelete: 'RESTRICT',
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
		await queryInterface.dropTable('ApplicationSubjects');
	},
};
