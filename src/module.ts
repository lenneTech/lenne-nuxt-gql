import { addImportsDir, addTemplate, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';
import { defu } from 'defu';
import { Parser } from 'graphql-js-tree';
import { TreeToTS } from 'graphql-zeus-core';
import { readFileSync } from 'node:fs';
// TODO: replace when es-module error is fixed
import { Utils } from './zeus_utils';
const logger = useLogger("[nuxt-zeus] ");

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
    name: 'nuxt-zeus',
    configKey: 'zeus'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    host: '',
    tokenPrefix: 'gql:'
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    if (!options.host) {
      throw new Error('[nuxt-zeus]: Host must be provided, in module config!')
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
        logger.success("[nuxt-zeus] custom remote schema path will be used");
        schemaFileContents = await Utils.getFromUrl(options.pathToSchema)
      } else {
        logger.success("[nuxt-zeus] local schema will be used");
        schemaFileContents = readFileSync(resolve(options.pathToSchema), 'utf8')
      }
    } else {
      logger.success("[nuxt-zeus] host will be used as schema path");
      schemaFileContents = await Utils.getFromUrl(options.host)
    }

    addTemplate({
      write: true,
      filename: `zeus/index.ts`,
      getContents: () => TreeToTS.resolveTree(
        { tree: Parser.parse(schemaFileContents), }
      ),
    });

    logger.success("[nuxt-zeus] Generated zeus/index.ts");
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
