<script lang="ts">
	import { marked } from 'marked';
	export let issue: string;
</script>

<article class="prose dark:invert">
	{@html marked.parse(issue)}
</article>
