const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Using modern `rgb`
				primary: 'rgb(var(--color-primary))',
				secondary: 'rgb(var(--color-secondary))'
			},
			fontFamily: {
				sans: ['Hiragino Maru Gothic Pro', 'ui-rounded', ...defaultTheme.fontFamily.sans],
				basteleur: ['Basteleur'],
				basteleur_bold: ['Basteleur Bold'],
				picnic: ['PicNic'],
				myriad: ['Myriad Regular'],
				myriad_semibold: ['Myriad Semibold'],
				myriad_bold: ['Myriad Bold']
			},
			fontSize: {
				'2xs': ['0.70rem', '1rem']
			}
		}
	},
	plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')]
};
