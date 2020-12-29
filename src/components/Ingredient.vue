<template>
    <div class="grid grid-cols-7 gap-4">
        <input class="col-span-2 bg-blue-200 p-2 rounded"
          type="text" name="name" v-model="nameValue" placeholder="name"
          autocomplete="off">
        <input class="col-span-2 bg-blue-200 p-2 rounded"
          type="number" name="weight" v-model="weightValue" placeholder="weight (g)"
          autocomplete="off">
        <div class="col-span-2 bg-blue-200 p-2 rounded">matched: {{matched}}</div>
        <div class="col-span-1 p-2">
            <button class="px-3 py-1 bg-red-200 rounded" @click="remove">-</button>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Ingredient',
  props: ['name', 'weight', 'matched'],
  data() {
    return {
        nameValue: this.name,
        weightValue: this.weight,
    }
  },  
  methods: {
      remove() {
          this.$emit('remove')
      }
  }
}
</script>

<style scoped>
</style>
