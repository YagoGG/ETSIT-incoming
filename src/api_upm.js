import axios from 'axios';

const API_ROOT = 'https://www.upm.es/wapi_upm/academico/comun/index.upm';
// See the official docs for more information on the API:
// https://www.upm.es/apiupm/webServices-pages.php

/**
 * List all the study plans available in a specific school.
 *
 * @param {string} schoolCode - UPM's identifier for the school (09 = ETSIT).
 * @returns A promise with an array of objects, each describing a study plan.
 */
export async function getStudyPlans(schoolCode) {
	return (
		await axios.get(`${API_ROOT}/v2/centro.json/${schoolCode}/planes`)
	).data;
}

/**
 * List all the subjects taught in a set of study plans.
 *
 * @param {Array<string>} studyPlans - UPM's identifier for the study plans to
 * 	fetch.
 * @returns A promise with an array of objects, each describing a unique
 * 	subject.
 */
export async function getSubjects(studyPlans) {
	/* Each subject might be taught in many study plans. This would make them
	 * appear multiple times in the list, which is something we want to avoid.
	 *
	 * This reducer solves the problem by creating a single object (allObject)
	 * of subjectCode: {subjectData } key-value pairs. To do that, any
	 * duplicate key that is added to planObject gets overwritten. */
	const allObject = await studyPlans.reduce(
		async (planObjectPromise, studyPlan) => {
		// Since we're working with async code, the object used between
		// iterations (planObject) is passed in a promise. It will get resolved
		// when the previous iteration is finished.
			const planObject = await planObjectPromise;
			const res = await axios.get(
				`${API_ROOT}/v2/plan.json/${studyPlan}/asignaturas`,
			);
			return {
			// subject1Code: {subject1Data},
			// subject2Code: {subject2Data}, ...
				...planObject,
				// any key in planObject that is in res.data is overwritten:
				...res.data,
			};
		// The first iteration will still await for planObjectPromise to
		// complete.  Since there is no work (yet) to be done, just pass an
		// empty object.
		}, Promise.resolve({}),
	);
	return Object.values(allObject);
}
