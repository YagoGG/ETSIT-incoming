export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Users', 'temporaryPassword', {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		});
	},

	down: async (queryInterface) => {
		await queryInterface.removeColumn('Users', 'temporaryPassword');
	},
};
