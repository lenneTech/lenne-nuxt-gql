import { Thunder } from '#zeus'
import { useRuntimeConfig, useGqlToken } from '#imports'
export function useZeus() {
    const config = useRuntimeConfig()
    const { zeus } = config.public
    const { accessToken } = useGqlToken()
    const thunder = Thunder(async (query) => {
        const response = await $fetch<{ data: unknown }>(zeus.host, {
            body: JSON.stringify({ query }),
            method: 'POST',
            headers: accessToken.value ? {
                'Content-Type': 'application/json',
            } : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken.value}`
            },
        });
        return response.data
    });
    return thunder;
}