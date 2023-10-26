<script lang="ts">
	export let text: string = '';
	export let url: string = '/';
	export let c_class: string = '';
</script>

<a class="relative {c_class} group" href={url} target="_blank">
	<img
		class="absolute inset-0 h-full w-full object-cover group-hover:shadow-black group-hover:drop-shadow-lg"
		src="/img/00185fm_button.png"
		alt="{text} Button"
	/>
	<span class="font-basteleur absolute inset-0 flex items-center justify-center p-2 text-lg"
		>{text}</span
	>
</a>

<style>
	a {
		min-width: 15rem;
		height: 4rem;
	}
	span {
		text-shadow: 3px 3px 7px #3d3d3d7b;
	}
</style>
