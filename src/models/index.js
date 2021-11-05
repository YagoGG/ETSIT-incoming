import AcademicPeriod from './academic_period';
import Application from './application';
import MobilityProgram from './mobility_program';
import User from './user';

/*
Institution.hasMany(Application, {
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
	foreignKey: 'institutionId',
});
Application.belongsTo(Institution);
*/
User.Application = User.hasOne(Application, {
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
	foreignKey: 'userId',
});
Application.belongsTo(User, { foreignKey: 'userId' });
Application.MobilityProgram = Application.belongsTo(MobilityProgram, {
	onDelete: 'RESTRICT',
	onUpdate: 'RESTRICT',
	foreignKey: 'mobilityProgramId',
});
MobilityProgram.hasMany(Application, { foreignKey: 'mobilityProgramId' });
Application.AcademicPeriod = Application.belongsTo(AcademicPeriod, {
	onDelete: 'RESTRICT',
	onUpdate: 'RESTRICT',
	foreignKey: 'academicPeriodId',
});
AcademicPeriod.hasMany(Application, { foreignKey: 'academicPeriodId' });

export {
	AcademicPeriod, Application, MobilityProgram, User,
};
