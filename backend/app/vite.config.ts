// import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit()
		// purgeCss({
		// 	safelist: [
		// 		'underline',
		// 		'line-through',
		// 		'font-bold',
		// 		'italic',
		// 		'link',
		// 		'code',
		// 		'quote',
		// 		/^w-1\/(\d+)$/,
		// 		/justify-(\w+)$/,
		// 		/items-(\w+)$/,
		// 		/text-(left|right|center|justify)$/,
		// 		/text-(sm|xl|2xl|3xl|4xl)$/,
		// 		/(bg|text)-(gray|red|yellow|green|blue|indigo|purple|pink)-(\d{1}0{1,2})$/,
		// 		/leading-(\w+)$/,
		// 		/-?(m|p)[tlrb]?-(0|px|0.5|1|2|3|4|5|10|16|20|40|60)$/,
		// 		/(w|h)-(auto|full|0|3|4|10|16|20|32|40|60|80|96|128)$/
		// 	]
		// })
	]
});
