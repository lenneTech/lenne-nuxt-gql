<template>
  <div>
    Nuxt module playground! {{ selectedPokemon }}
    <ul v-if="data?.pokemons">
      <li
        v-for="item of data.pokemons.results"
        :key="item.id"
      >
        <p>{{ item.name }}</p>
        <button @click="selectedPokemon = item.name!">
          Select
        </button>
      </li>
    </ul>
    <button @click="pokemon.refresh()">
      refresh
    </button>
    <pre>{{ { pending } }}</pre>
    <pre>{{ { error } }}</pre>
    <pre>{{ { selectedPokemon: pokemon.data } }}</pre>
    <pre>{{ { host: zeus.host } }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, useAsyncQuery, useRuntimeConfig } from '#imports';
const selectedPokemon = ref('charmander')
const { zeus } = useRuntimeConfig().public
const { data, pending, error } = await useAsyncQuery('pokemons', () => ({ pokemons: [{ limit: 5 }, { count: true, results: { id: true, name: true } }] }))
const pokemon = await useAsyncQuery('pokemon_query', () => ({ pokemon: [{ name: selectedPokemon.value }, { id: true, name: true, species: { id: true, name: true }, forms: { id: true, name: true } }] }), { watch: [selectedPokemon] })
</script>
