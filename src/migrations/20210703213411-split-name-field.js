export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.renameColumn('Users', 'name', 'firstName');
		await queryInterface.addColumn('Users', 'lastName', {
			type: Sequelize.DataTypes.STRING,
		});
	},

	down: async (queryInterface) => {
		await queryInterface.renameColumn('Users', 'firstName', 'name');
		await queryInterface.removeColumn('Users', 'lastName');
	},
};
