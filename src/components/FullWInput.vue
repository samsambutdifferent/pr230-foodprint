<template>
    <div class="w-full my-2 p-1 bg-white flex">
        <input class="w-full border-b-2 border-gray-300 bg-white h-10 px-5 pr-16 focus:outline-none"
        type="text" :name="nameProp" v-model="value" @input="valueChanged" :placeholder="placeholderProp"
        autocomplete="off">
    </div>  
</template>

<script>

export default {
  name: 'FullWInput',
  props: ["valueProp", 'placeholderProp', 'nameProp'],
  data() {
    return {
        value: this.valueProp
    }
  },
  methods: {
      valueChanged() {  
          this.$emit('valueChanged', this.value)
      },
  }
}
</script>

<style scoped>
</style>
