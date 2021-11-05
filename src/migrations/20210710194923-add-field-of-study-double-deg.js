import { Application } from '../models';

export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Applications', 'fieldOfStudy', {
			type: Sequelize.ENUM,
			values: [
				Application.FIELD_STUDY_CS,
				Application.FIELD_STUDY_EE,
				Application.FIELD_STUDY_BIO,
			],
		});
		await queryInterface.addColumn('Applications', 'seeksDoubleDegree', {
			type: Sequelize.BOOLEAN,
		});
	},

	down: async (queryInterface) => {
		await queryInterface.removeColumn('Applications', 'fieldOfStudy');
		await queryInterface.removeColumn('Applications', 'seeksDoubleDegree');
	},
};
