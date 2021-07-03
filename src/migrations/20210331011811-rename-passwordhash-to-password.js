export default {
	up: async (queryInterface) => {
		await queryInterface.renameColumn('Users', 'passwordHash', 'password');
	},

	down: async (queryInterface) => {
		await queryInterface.renameColumn('Users', 'password', 'passwordHash');
	},
};
