export default defineNuxtConfig({
  modules: ['../src/module'],
  zeus: {
    host: 'https://graphql-pokeapi.graphcdn.app',

    // Test Local Schema
    // pathToSchema: '../playground/myLocaleSchema/schema.gql'

    // Test Remote Schema
    //pathToSchema: 'https://spacex-api-2gl6xp7kua-ue.a.run.app/query'
  }
})
