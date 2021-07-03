import { User } from '../models';

export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Users', 'role', {
			type: Sequelize.ENUM,
			values: [User.STUDENT_ROLE, User.ADMIN_ROLE],
			defaultValue: User.STUDENT_ROLE,
			allowNull: false,
		});
	},

	down: async (queryInterface) => {
		await queryInterface.removeColumn('Users', 'role');
	},
};
