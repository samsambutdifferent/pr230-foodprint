<template>
    <div class="relative my-4 border-b-2 focus-within:border-blue-500">
      <input type="text" :name="nameProp" placeholder=" " v-model="value" @input="valueChanged" autocomplete="off"
      class="block w-full appearance-none focus:outline-none bg-transparent" />
      <label :for="nameProp" class="absolute top-0 unselectable text-gray-400">{{placeholderProp}}</label>
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
input:not(:placeholder-shown) ~ label {
  @apply transform scale-75 -translate-y-6;
}

input:focus-within ~ label {
  @apply text-blue-500;
}

.unselectable {
    background: none !important;
    pointer-events: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

</style>
