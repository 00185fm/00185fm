// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

type User = import('pocketbase').AuthModel;

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: import('pocketbase').default;
			user: User;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
