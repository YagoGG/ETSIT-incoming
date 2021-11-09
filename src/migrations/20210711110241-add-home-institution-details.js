export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Applications', 'homeInstitutionSchool', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'homeInstitutionAddress', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'homeInstitutionCoordinatorName', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'homeInstitutionContactName', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'homeInstitutionContactEmail', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'homeInstitutionContactPhone', {
			type: Sequelize.STRING,
		});
	},

	down: async (queryInterface) => {
		await queryInterface.removeColumn('Applications', 'homeInstitutionSchool');
		await queryInterface.removeColumn('Applications', 'homeInstitutionAddress');
		await queryInterface.removeColumn('Applications', 'homeInstitutionCoordinatorName');
		await queryInterface.removeColumn('Applications', 'homeInstitutionContactName');
		await queryInterface.removeColumn('Applications', 'homeInstitutionContactEmail');
		await queryInterface.removeColumn('Applications', 'homeInstitutionContactPhone');
	},
};
