export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Applications', 'hasWorkExperience', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'workExperienceRole', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'workExperienceEmployer', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'workExperienceLocation', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'workExperienceStartDate', {
			type: Sequelize.DATEONLY,
		});
		await queryInterface.addColumn('Applications', 'workExperienceEndDate', {
			type: Sequelize.DATEONLY,
		});
	},

	down: async (queryInterface) => {
		await queryInterface.removeColumn('Applications', 'hasWorkExperience');
		await queryInterface.removeColumn('Applications', 'workExperienceRole');
		await queryInterface.removeColumn('Applications', 'workExperienceEmployer');
		await queryInterface.removeColumn('Applications', 'workExperienceLocation');
		await queryInterface.removeColumn('Applications', 'workExperienceStartDate');
		await queryInterface.removeColumn('Applications', 'workExperienceEndDate');
	},
};
