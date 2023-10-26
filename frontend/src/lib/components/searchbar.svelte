<div class="relative h-12">
	<img class="border-img" src="/img/search_box.svg" alt="Search Box" />
	<div class="flex h-full items-center justify-center">
		<img class="w-6 pl-1" src="/img/search_icon.svg" alt="Search Icon" />
		<input
			id="searchbox"
			name="searchbox"
			type="text"
			class="searchbox font-basteleur h-full w-2/3 pl-2"
			placeholder="Search.."
		/>
	</div>
</div>

<style>
	.border-img {
		z-index: 0;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.searchbox {
		outline: none !important;
		position: relative;
		z-index: 20;
		background-color: transparent;
	}
</style>
