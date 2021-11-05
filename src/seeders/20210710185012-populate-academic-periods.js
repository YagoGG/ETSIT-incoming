export default {
	up: async (queryInterface) => {
		await queryInterface.bulkInsert('AcademicPeriods', [{
			name: '2021-2022: Fall Semester',
			active: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: '2021-2022: Spring Semester',
			active: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: '2021-2022: Full Academic Year',
			active: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		}], {});
	},

	down: async (queryInterface) => {
		await queryInterface.bulkDelete('AcademicPeriods', null, {});
	},
};
