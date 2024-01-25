<script lang="ts">
	export let page: string = '';
	let crumbs = [{}];

	$: {
		// Remove zero-length tokens.
		const tokens = page.split('/').filter((t) => t !== '');

		// Create { label, href } pairs for each token.
		let tokenPath = '';
		crumbs = tokens.map((t) => {
			tokenPath += '/' + t;
			return {
				label: t,
				link: tokenPath
			};
		});

		// Add a way to get home too.
		crumbs.unshift({ label: 'home', link: '/' });
	}
</script>

<ol class="breadcrumb hidden sm:inline-flex">
	{#each crumbs as crumb, i}
		<!-- If crumb index is less than the breadcrumb length minus 1 -->
		{#if i < crumbs.length - 1}
			<li class="crumb"><a class="anchor capitalize" href={crumb.link}>{crumb.label}</a></li>
			<li class="crumb-separator" aria-hidden>/</li>
		{:else}
			<li class="crumb capitalize">{crumb.label}</li>
		{/if}
	{/each}
</ol>
