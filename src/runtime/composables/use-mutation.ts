import { GraphQLTypes, InputType, OperationOptions, ValueTypes } from "#zeus";
import { useZeus } from "./use-zeus";

export function useMutation<O extends "Mutation", TData extends ValueTypes[O], TResult = InputType<GraphQLTypes[O], TData>>(
    mutation: TData | ValueTypes[O],
    zeusOptions?: OperationOptions,
) {
    const zeus = useZeus()
    return zeus("mutation")(mutation, zeusOptions) as Promise<TResult>
}


/* export const drawCardQuery = Selector("Mutation")({
    signIn: [{ input: { email: 'e@mail.de', password: '1234' } }, { token: true, refreshToken: true, user: { createdBy: true, roles: true } }]
});

type InferredResponseType = InputType<GraphQLTypes['Mutation'], typeof drawCardQuery>['signIn']; */