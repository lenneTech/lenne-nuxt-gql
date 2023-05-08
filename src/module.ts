import { defineNuxtModule, createResolver, addImportsDir, addTemplate, useLogger } from '@nuxt/kit'
import { TreeToTS } from 'graphql-zeus-core';
import { Parser } from 'graphql-js-tree';
import { readFileSync } from 'node:fs'
import { defu } from 'defu'

const logger = useLogger("[@lenne.tech/zeus] ");

export interface ModuleOptions {
  /**
 * Host Url will used to fetch Data
 */
  host: string
  /**
  * pathToSchema, if not provided, host url will used to fetch schema
  */
  pathToSchema?: string

  /**
  * Prefix for the token in Cookies default gql:access_token & gql:refresh_token
  @default 'gql:''
  */
  tokenPrefix: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@lenne.tech/lenne-nuxt-gql',
    configKey: 'zeus'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    host: '',
    tokenPrefix: 'gql:'
  },
  async setup(options, nuxt) {
    const { Utils } = await import('graphql-zeus/Utils')

    const { resolve } = createResolver(import.meta.url)

    if (!options.host) {
      throw new Error('[@lenne.tech/zeus]: Host must be provided, in module config!')
    }

    nuxt.options.runtimeConfig.public.zeus = defu(nuxt.options.runtimeConfig.public.zeus, {
      host: options.host,
      tokenPrefix: options.tokenPrefix
    })

    nuxt.options.runtimeConfig.zeus = defu(nuxt.options.runtimeConfig.zeus, {
      pathToSchema: options.pathToSchema
    })


    let schemaFileContents = ''

    if (options.pathToSchema) {
      if (options.pathToSchema && options.pathToSchema.startsWith('http')) {
        logger.success("[@lenne.tech/zeus] custom remote schema path will be used");
        schemaFileContents = await Utils.getFromUrl(options.pathToSchema)
      } else {
        logger.success("[@lenne.tech/zeus] local schema will be used");
        schemaFileContents = readFileSync(resolve(options.pathToSchema), 'utf8')
      }
    } else {
      logger.success("[@lenne.tech/zeus] host will be used as schema path");
      schemaFileContents = await Utils.getFromUrl(options.host)
    }

    addTemplate({
      write: true,
      filename: `zeus/index.ts`,
      getContents: () => TreeToTS.resolveTree(
        { tree: Parser.parse(schemaFileContents), }
      ),
    });

    logger.success("[@lenne.tech/zeus] Generated zeus/index.ts");
    nuxt.options.alias['#zeus'] = resolve(nuxt.options.buildDir, 'zeus')
    nuxt.options.alias['#zeus/*'] = resolve(nuxt.options.buildDir, 'zeus', '*')

    addImportsDir(resolve('./runtime/composables'))
  }
})

interface ModulePublicRuntimeConfig {
  host: ModuleOptions['host']
  tokenPrefix: ModuleOptions['tokenPrefix']
}

interface ModulePrivateRuntimeConfig {
  pathToSchema: ModuleOptions['pathToSchema']
}

declare module '@nuxt/schema' {
  interface ConfigSchema {
    runtimeConfig: {
      public?: {
        zeus?: ModulePublicRuntimeConfig;
      }
      private?: {
        zeus?: ModulePrivateRuntimeConfig
      }
    }
  }
}
