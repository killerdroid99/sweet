import { getServerChannels, serverStore } from '$lib/stores/servers.svelte';
import type { PageLoad } from '../$types';

export const load: PageLoad = ({ params }) => {
	serverStore.selectedServer = params.serverId;

	return {
		serverId: params.serverId,
		channelId: params.channelId
	};
};
