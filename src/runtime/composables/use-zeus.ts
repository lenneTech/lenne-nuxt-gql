import { Chain } from '#zeus'
import { useRuntimeConfig } from '#imports'
export function useZeus() {
    const config = useRuntimeConfig()
    const { zeus } = config.public
    const chain = Chain(zeus.host);
    return chain
}