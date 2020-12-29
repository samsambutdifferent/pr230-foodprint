<template>
<div class="relative bg-white">
  <div class="mx-auto px-4 sm:px-6">
    <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
      <div class="flex justify-start lg:w-0 lg:flex-1">
        <a href="#">
          <img class="h-8 w-auto sm:h-10" src="../assets/frog-prints.png" alt="">
        </a>
      </div>
      <div class="text-2xl font-bold text-gray-800 md:text-3xl">
          <a href="#">Foodprint</a>
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
