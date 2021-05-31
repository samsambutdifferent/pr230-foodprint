<template>
        <div class="text-gray-800 relative pt-4 pb-10">
            <strong>{{title}}</strong> 
            <br>
            {{text}}
        </div>
</template>

<script>

export default {
  name: 'StepBox',
  props: ["title", "text"],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
