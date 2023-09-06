<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">00185fm</h2>

		<form method="POST" use:enhance>
			<button class="btn variant-filled" type="submit" formaction="?/nextsong">Skip</button>
		</form>
	</div>
</div>
