<script lang="ts">
	export let text: string = '';
	export let c_class: string = 'uppercase';
	export let font: string = 'font-sans';
	export let rounded: string = 'rounded-3xl';
	export let bg_color: string = 'bg-slate-100';
	export let outline: string = 'outline outline-1 outline-black';
	export let padding: string = 'px-2';
	export let size: string = 'h-[23px] w-fit';
</script>

<button class="{font} {size} {rounded} {bg_color} {c_class} {outline} {padding}">
	{text}
</button>

<style>
	button:hover {
		box-shadow:
			5px 8px 10px #dadada,
			-5px -8px 10px #ffffff;
	}
</style>
