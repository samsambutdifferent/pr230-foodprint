<template>
    <div class="grid grid-cols-7 gap-4">
        <input class="col-span-4 md:col-span-2 bg-blue-200 p-2 rounded"
          type="text" name="name" v-model="nameValue" @change="() => matchSemantic(nameValue)" placeholder="name"
          autocomplete="off">
        <input class="col-span-2 bg-blue-200 p-2 rounded"
          type="number" name="weight" v-model="weightValue" placeholder="weight (g)"
          autocomplete="off">
        <div class="col-span-2 bg-blue-200 p-2 rounded">{{matchedValue}}</div>
        <div class="col-span-1 p-2">
            <button class="px-3 py-1 bg-red-200 rounded" @click="remove">-</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Ingredient',
  props: ['name', 'weight', 'matched'],
  data() {
    return {
        nameValue: this.name,
        weightValue: this.weight,
        matchedValue: this.matched
    }
  },
  methods: {
      async matchSemantic(name) {
          let mx = await axios.post(process.env.VUE_APP_SEMANTIC_MATCHER_MATCH, {name: name})
            .then(function (response) {
              return response.data;
            });
            this.matchedValue = mx.matched
      },
      remove() {
          this.$emit('remove')
      }
  }
}
</script>

<style scoped>
</style>
