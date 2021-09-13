import { Application } from '../models';

export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Applications', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			dateOfBirth: {
				type: Sequelize.DATEONLY,
			},
			placeOfBirth: {
				type: Sequelize.STRING,
			},
			nationality: {
				type: Sequelize.STRING,
			},
			sex: {
				type: Sequelize.ENUM,
				values: [
					Application.SEX_MALE,
					Application.SEX_FEMALE,
					Application.SEX_OTHER,
				],
			},
			residenceAddress: {
				type: Sequelize.STRING,
			},
			residenceState: {
				type: Sequelize.STRING,
			},
			residenceZipCode: {
				type: Sequelize.STRING,
			},
			residenceCountry: {
				type: Sequelize.STRING,
			},
			phoneNumber: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable('Applications');
	},
};
