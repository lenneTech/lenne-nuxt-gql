
import { GraphQLTypes, InputType, OperationOptions, ValueTypes } from '#zeus'
import { useZeus } from './use-zeus'



export function useQuery<O extends "Query", TData extends ValueTypes[O], TResult = InputType<GraphQLTypes[O], TData>>(
    query: TData | ValueTypes[O],
    zeusOptions?: OperationOptions,
) {
    const zeus = useZeus()
    return zeus("query")(query, zeusOptions) as Promise<TResult>
}