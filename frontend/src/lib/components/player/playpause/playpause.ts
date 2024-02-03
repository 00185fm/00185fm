export const playpause = async (player: HTMLAudioElement) => {
	let icon = 'play';
	if (player.paused) {
		// player.load();
		player.play();
		icon = 'pause';
	} else {
		player.pause();
		icon = 'play';
	}
	return icon;
};
