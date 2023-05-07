
import { GraphQLTypes, InputType, ValueTypes } from '#zeus'
import { AsyncDataOptions, useAsyncData } from 'nuxt/app'
import { useQuery } from './use-query'

type KeysOf<T> = Array<T extends T ? keyof T extends string ? keyof T : never : never>

export async function useAsyncQuery<O extends "Query", TData extends ValueTypes[O], TResult = InputType<GraphQLTypes[O], TData>>(
    key: string,
    query: () => TData | ValueTypes[O],
    options?: AsyncDataOptions<TResult, TResult, KeysOf<TResult>>
) {     
    return useAsyncData<TResult>(key, () => useQuery(query()), options)
}