import { defineNuxtModule, createResolver, addImportsDir, addTemplate, useLogger } from '@nuxt/kit'
import { Utils } from 'graphql-zeus/Utils';
import { TreeToTS } from 'graphql-zeus-core';
import { Parser } from 'graphql-js-tree';
import { readFileSync } from 'node:fs'


const logger = useLogger("[@lenne.tech/lenne-nuxt-gql] ");


// Module options TypeScript interface definition
export interface ModuleOptions {
  path: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@lenne.tech/lenne-nuxt-gql',
    configKey: 'lenneNuxtGql'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    path: ''
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    let schemaFileContents = ''
    
    if (options.path && options.path.startsWith('http')) {
      schemaFileContents = await Utils.getFromUrl(options.path)
    } else {
      schemaFileContents = readFileSync(options.path || resolve('./sample/schema.gql'), 'utf8')
    }

    addTemplate({
      write: true,
      filename: `zeus/index.ts`,
      getContents: () => TreeToTS.resolveTree(
        { tree: Parser.parse(schemaFileContents), }
      ),
    });

    logger.success("[@lenne.tech/lenne-nuxt-gql] Generated zeus/index.ts");
    nuxt.options.alias['#zeus'] = resolve(nuxt.options.buildDir, 'zeus')
    nuxt.options.alias['#zeus/*'] = resolve(nuxt.options.buildDir, 'zeus', '*')

    addImportsDir(resolve('./runtime/composables'))
  }
})
