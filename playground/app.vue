<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '#imports';

const mutation = useMutation('signIn', '', ['token', 'refreshToken', { user: ['createdBy', 'roles'] }])

const { signIn } = await mutation({
  signIn: [{ input: { email: 'e@mail.de', password: '1234' } }, { token: true, refreshToken: true, user: { createdBy: true, roles: true } }]
})

</script>
