import { ModelTypes } from '#zeus';
import { KeysArray } from '../../types';
import { transformToZeusSyntax } from '../../utils';
import { useZeus } from './use-zeus';



export function useMutation<O extends keyof ModelTypes["Mutation"], T extends ModelTypes["Mutation"][O]>(ops: O, variables: any, object: KeysArray<T>) {
    const zeus = useZeus()
    console.log('ops', ops);
    console.log('variables', variables);
    console.log('object', object);
    const zeusObject = transformToZeusSyntax<KeysArray<T>>(object)
    console.log('zeusObject', zeusObject);
    return zeus('mutation')
}