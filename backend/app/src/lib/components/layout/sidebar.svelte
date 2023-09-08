<script lang="ts">
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import PackageOpen from '$lib/icons/package-open.svelte';
	import ListTodo from '$lib/icons/list-todo.svelte';
	import ListVideo from '$lib/icons/list-video.svelte';
	import Play from '$lib/icons/play.svelte';
	import Tags from '$lib/icons/tags.svelte';
	import CalendarClock from '$lib/icons/calendar-clock.svelte';
</script>

<AppRail width="w-15 sm:w-20">
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
			<svelte:fragment slot="lead">
				<Play />
			</svelte:fragment>
			<span>Home</span>
		</AppRailAnchor>
	</svelte:fragment>
	<AppRailAnchor href="/episodes" selected={$page.url.pathname.split('/')[1] === 'episodes'}>
		<svelte:fragment slot="lead">
			<ListTodo />
		</svelte:fragment>
		<span>Episodes</span>
	</AppRailAnchor>
	<AppRailAnchor href="/shows" selected={$page.url.pathname.split('/')[1] === 'shows'}>
		<svelte:fragment slot="lead">
			<PackageOpen />
		</svelte:fragment>
		<span>Shows</span>
	</AppRailAnchor>
	<AppRailAnchor href="/tags" selected={$page.url.pathname.split('/')[1] === 'tags'}>
		<svelte:fragment slot="lead">
			<Tags />
		</svelte:fragment>
		<span>Tags</span>
	</AppRailAnchor>
	<AppRailAnchor href="/playlists" selected={$page.url.pathname.split('/')[1] === 'playlists'}>
		<svelte:fragment slot="lead">
			<ListVideo />
		</svelte:fragment>
		<span>Playlists</span>
	</AppRailAnchor>
	<AppRailAnchor href="/schedules" selected={$page.url.pathname.split('/')[1] === 'schedules'}>
		<svelte:fragment slot="lead">
			<CalendarClock />
		</svelte:fragment>
		<span>Schedules</span>
	</AppRailAnchor>
</AppRail>
