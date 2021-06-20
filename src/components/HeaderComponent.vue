<template>
<div class="relative bg-white">
  <div class="mx-auto px-4 sm:px-6">
    <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
      <div class="flexf justify-start lg:w-0 lg:flex-1">
        <img class="h-10 md:h-16 w-auto" src="../assets/frog-prints.png" alt="">
      </div>
      <div>
        <p  @click="() => routeTo('aboutPage')">about</p>
      </div>
      <div class="text-2xl font-bold text-gray-800 md:text-3xl"
        @click="routeTo('MealSearch')">
          <p>foodprint</p>
      </div>

      
     
      <nav class="hidden md:flex space-x-10">
        <div class="relative">
          <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->
        
        </div>
      </nav>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  methods: {
    routeTo(name){
      this.$emit('changePage', name)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
