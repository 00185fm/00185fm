<script lang="ts">
	import { marked } from 'marked';
	export let issue: string;
</script>

<article class="prose">
	{@html marked.parse(issue)}
</article>
