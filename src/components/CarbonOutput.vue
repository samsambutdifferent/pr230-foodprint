<template>
    <div>
        co2e: {{co2e}}
    </div>
</template>

<script>

export default {
  name: 'CarbonOutput',
  inject: ['carbonValue'],
  data() {
    return {
        co2e: this.carbonValue
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
