
import { ModelTypes } from '#zeus'
import { KeysArray } from '../../types';
import { useZeus } from './use-zeus'



export function useQuery<O extends keyof ModelTypes["Query"], T extends ModelTypes["Query"][O]>(ops: O, variables: any, object: KeysArray<T>) {
    const zeus = useZeus()
    console.log('ops', ops);
    console.log('variables', variables);
    console.log('object', object);
    return zeus('query')
}