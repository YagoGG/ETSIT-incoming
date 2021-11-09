export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Applications', 'purposeOfStayBachelorCourses', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'purposeOfStayMasterCourses', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'purposeOfStayThesis', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'purposeOfStayResearchProject', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'purposeOfStayOther', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'purposeOfStayOtherDetails', {
			type: Sequelize.STRING,
		});
	},

	down: async (queryInterface) => {
		await queryInterface.removeColumn('Applications', 'purposeOfStayBachelorCourses');
		await queryInterface.removeColumn('Applications', 'purposeOfStayMasterCourses');
		await queryInterface.removeColumn('Applications', 'purposeOfStayThesis');
		await queryInterface.removeColumn('Applications', 'purposeOfStayResearchProject');
		await queryInterface.removeColumn('Applications', 'purposeOfStayOther');
		await queryInterface.removeColumn('Applications', 'purposeOfStayOtherDetails');
	},
};
