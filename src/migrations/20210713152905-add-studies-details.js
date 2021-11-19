export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Applications', 'currentStudiesName', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'currentStudiesYear', {
			type: Sequelize.INTEGER,
		});
		await queryInterface.addColumn('Applications', 'currentStudiesSpecialisation', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'hasStudiedAbroad', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'abroadStudiesInstitution', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'abroadStudiesLocation', {
			type: Sequelize.STRING,
		});
	},

	down: async (queryInterface) => {
		await queryInterface.removeColumn('Applications', 'currentStudiesName');
		await queryInterface.removeColumn('Applications', 'currentStudiesYear');
		await queryInterface.removeColumn('Applications', 'currentStudiesSpecialisation');
		await queryInterface.removeColumn('Applications', 'hasStudiedAbroad');
		await queryInterface.removeColumn('Applications', 'abroadStudiesInstitution');
		await queryInterface.removeColumn('Applications', 'abroadStudiesLocation');
	},
};
