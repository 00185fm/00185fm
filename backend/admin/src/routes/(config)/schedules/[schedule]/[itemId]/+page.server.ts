import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals, parent }) => {
	if (!locals?.user) throw redirect(302, '/login');
	console.log(await parent());
	// const schedules = (await parent()).schedules;
	// const scheduledItem: RecordModel | undefined = scheduledItems?.find(
	// 	(i: RecordModel) =>  === params.schedule
	// );
	// const query = `date >="${new Date(Date.now()).toISOString()}"`;
	// const episodes: RecordModel[] | undefined = await pb.collection('episodes').getFullList({
	// 	filter: query,
	// 	sort: 'date'
	// });
	// const scheduledItems: RecordModel[] =
	// 	(await pb.collection(Collections.ScheduledItems).getFullList({
	// 		sort: 'date',
	// 		filter: `schedule="${schedule?.id}"`,
	// 		expand: 'episode',
	// 		fields: '*,expand.episode.title,expand.episode.slug,expand.episode.author,expand.episode.id'
	// 	})) || [];
	// if (!schedule) {
	// 	throw redirect(302, '/schedules');
	// }
	// return {
	// 	createForm: await superValidate(createScheduledItem),
	// 	updateForm: await superValidate(updateSchedule),
	// 	schedule,
	// 	episodes,
	// 	scheduledItems
	// };
};
