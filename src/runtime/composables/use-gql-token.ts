import { useRuntimeConfig, useCookie } from '#imports'
import { CookieRef } from 'nuxt/app'

interface AccessToken {
    accessToken: CookieRef<string | undefined>
}

interface RefreshToken {
    refreshToken: CookieRef<string | undefined>
}

type BothTokens = AccessToken & RefreshToken

// TODO: add more Token infos like exp...

export function useGqlToken<
    T extends 'access' | 'refresh' | 'both' = 'access',
    RType = T extends 'access' ? AccessToken : T extends 'refresh' ? RefreshToken : T extends 'both' ? BothTokens : T extends undefined ? AccessToken : never
>(token?: T): RType {
    const config = useRuntimeConfig()
    const { zeus } = config.public
    const prefix = zeus.tokenPrefix
    if (!token || token === 'access') {
        return {
            accessToken: useCookie(`${prefix}access_token`)
        } as RType
    } else if (token === 'refresh') {
        return {
            refreshToken: useCookie(`${prefix}refresh_token`)
        } as RType
    } else {
        return {
            accessToken: useCookie(`${prefix}access_token`),
            refreshToken: useCookie(`${prefix}refresh_token`)
        } as RType
    }
}