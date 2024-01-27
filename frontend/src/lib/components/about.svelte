<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	import ImpressumCard from './cards/impressumCard.svelte';
	import ContactsCard from './cards/contactsCard.svelte';
	import Button from './button.svelte';
	export let projects: RecordModel[] = [];
	const radio_infos: RecordModel | undefined = projects.find((p) => p.name === '00185fm');
	let contacts: boolean = false;
	let impressum: boolean = false;
</script>

{#if radio_infos}
	<div class="absolute left-52 top-32 z-50 grid max-w-xl">
		{#if contacts}
			<ContactsCard {projects} />
		{/if}
		<div class=" bg-white text-justify font-basteleur text-xl">
			<p>
				{@html radio_infos?.about}
			</p>
		</div>
		<div class="grid h-min grid-cols-2 bg-transparent">
			<Button
				text={'contacts'}
				c_class="hidden lg:block"
				on:subClick={() => (contacts = !contacts)}
				event={true}
			/>
			<Button
				text={'impressum'}
				c_class="hidden lg:block"
				on:subClick={() => (impressum = !impressum)}
				event={true}
			/>
		</div>
		{#if impressum}
			<ImpressumCard impressum={radio_infos?.impressum} />
		{/if}
	</div>
{/if}
