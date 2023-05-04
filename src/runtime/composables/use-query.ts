import { useZeus } from './use-zeus'

export async function useQuery() {
    const zeus = useZeus()
    return await zeus('query')
}