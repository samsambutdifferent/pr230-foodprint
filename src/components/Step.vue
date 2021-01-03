<template>
    <div class="mb-20 bg-gradient-to-r from-green-400 to-white">
      <p class="font-bold pb-2">
          {{capitalise(titleProp)}}
      </p>
      <p class="text-gray-500">{{textProp}}</p>
    </div>
</template>

<script>
export default {
  name: 'Step',
  props: ['textProp', 'titleProp'],
  methods: {
      capitalise(val) {
        return(val.toUpperCase())
      }
  }
}
</script>

<style scoped>
</style>
