import AcademicPeriod from './academic_period';
import Application from './application';
import Institution from './institution';
import MobilityProgram from './mobility_program';
import Subject from './subject';
import User from './user';

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

Application.HomeInstitution = Application.belongsTo(Institution, {
	foreignKey: 'homeInstitutionId',
	// We add the "HomeInstitution" alias, because otherwise we would have to
	// access it via Application.Institution.
	as: 'HomeInstitution',
});
Institution.hasMany(Application, {
	onDelete: 'RESTRICT',
	foreignKey: 'homeInstitutionId',
	as: 'HomeInstitution',
});

export {
	AcademicPeriod, Application, Institution, MobilityProgram, Subject, User,
};
