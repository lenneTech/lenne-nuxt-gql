import { useRuntimeConfig, useCookie } from '#imports'

export function setGqlToken(token: string, refreshToken?: string) {
    const config = useRuntimeConfig()
    const { zeus } = config.public
    const prefix = zeus.tokenPrefix
    const refresh_token = useCookie(`${prefix}refresh_token`)
    const accessToken = useCookie(`${prefix}access_token`)
    accessToken.value = token
    refresh_token.value = refreshToken

    return {
        accessToken: accessToken.value,
        refreshToken: refresh_token ? refresh_token.value : null
    }
}