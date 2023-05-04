import { Chain } from '#zeus'
export function useZeus() {
    const chain = Chain('https://api.todo.lenne.tech/graphql');
    return chain
}