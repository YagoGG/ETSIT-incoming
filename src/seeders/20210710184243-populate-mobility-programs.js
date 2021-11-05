export default {
	up: async (queryInterface) => {
		await queryInterface.bulkInsert('MobilityPrograms', [{
			name: 'Erasmus+ studies',
			active: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: 'Erasmus+ internship',
			active: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: 'Magalhães',
			active: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: 'Bilateral agreement',
			active: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: 'Visiting student',
			active: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: 'SICUE',
			active: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: 'EIT Health (MTiH)',
			active: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		}], {});
	},

	down: async (queryInterface) => {
		await queryInterface.bulkDelete('MobilityPrograms', null, {});
	},
};
