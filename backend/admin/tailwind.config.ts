import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	safelist: [
		'underline',
		'line-through',
		'font-bold',
		'italic',
		'link',
		'code',
		'quote',
		{
			pattern: /^w-1\/(\d+)$/,
			variants: ['sm']
		},
		{
			pattern: /justify-(\w+)$/
		},
		{
			pattern: /items-(\w+)$/
		},
		{
			pattern: /text-(left|right|center|justify)$/
		},
		{
			pattern: /text-(sm|xl|2xl|3xl|4xl)$/
		},
		{
			pattern: /(bg|text)-(gray|red|yellow|green|blue|indigo|purple|pink)-(\d{1}0{1,2})$/
		},
		{
			pattern: /leading-(\w+)$/
		},
		{
			pattern: /-?(m|p)[tlrb]?-(0|px|0.5|1|2|3|4|5|10|16|20|40|60)$/
		},
		{
			pattern: /(w|h)-(auto|full|0|3|4|10|16|20|32|40|60|80|96|128)$/
		}
	],
	plugins: [
		forms,
		skeleton({
			themes: {
				preset: ['crimson']
			}
		}),
		require('@tailwindcss/typography')
	]
} satisfies Config;

export default config;
