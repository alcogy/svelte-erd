import type { globalState } from '$lib/types';

export const states = $state<globalState>({
	nodes: [],
	edges: [],
});