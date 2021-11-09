export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Applications', 'motherTongue', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'instructionLang', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'otherLang1Name', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'otherLang1CurrentlyStudying', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang1CanFollow', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang1CanFollowExtraPrep', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang2Name', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'otherLang2CurrentlyStudying', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang2CanFollow', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang2CanFollowExtraPrep', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang3Name', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'otherLang3CurrentlyStudying', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang3CanFollow', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang3CanFollowExtraPrep', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang4Name', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'otherLang4CurrentlyStudying', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang4CanFollow', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang4CanFollowExtraPrep', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang5Name', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Applications', 'otherLang5CurrentlyStudying', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang5CanFollow', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Applications', 'otherLang5CanFollowExtraPrep', {
			type: Sequelize.BOOLEAN,
		});
	},

	down: async (queryInterface) => {
		await queryInterface.removeColumn('Applications', 'motherTongue');
		await queryInterface.removeColumn('Applications', 'instructionLang');
		await queryInterface.removeColumn('Applications', 'otherLang1Name');
		await queryInterface.removeColumn('Applications', 'otherLang1CurrentlyStudying');
		await queryInterface.removeColumn('Applications', 'otherLang1CanFollow');
		await queryInterface.removeColumn('Applications', 'otherLang1CanFollowExtraPrep');
		await queryInterface.removeColumn('Applications', 'otherLang2Name');
		await queryInterface.removeColumn('Applications', 'otherLang2CurrentlyStudying');
		await queryInterface.removeColumn('Applications', 'otherLang2CanFollow');
		await queryInterface.removeColumn('Applications', 'otherLang2CanFollowExtraPrep');
		await queryInterface.removeColumn('Applications', 'otherLang3Name');
		await queryInterface.removeColumn('Applications', 'otherLang3CurrentlyStudying');
		await queryInterface.removeColumn('Applications', 'otherLang3CanFollow');
		await queryInterface.removeColumn('Applications', 'otherLang3CanFollowExtraPrep');
		await queryInterface.removeColumn('Applications', 'otherLang4Name');
		await queryInterface.removeColumn('Applications', 'otherLang4CurrentlyStudying');
		await queryInterface.removeColumn('Applications', 'otherLang4CanFollow');
		await queryInterface.removeColumn('Applications', 'otherLang4CanFollowExtraPrep');
		await queryInterface.removeColumn('Applications', 'otherLang5Name');
		await queryInterface.removeColumn('Applications', 'otherLang5CurrentlyStudying');
		await queryInterface.removeColumn('Applications', 'otherLang5CanFollow');
		await queryInterface.removeColumn('Applications', 'otherLang5CanFollowExtraPrep');
	},
};
