<template>
    <div
    class="w-full"> 
        <div class="w-full my-2 p-1 bg-white flex">
          <input class="w-full border-b-2 border-gray-300 bg-white h-10 px-5 pr-16 focus:outline-none"
          type="text" name="name" v-model="selectedMeal.name" placeholder="name"
          autocomplete="off">
        </div>  

        <div class="pt-2 pb-2 border-gray-300 bg-white h-auto px-5 pr-16">
               <Ingredient class="pt-2"
                v-for="(ingredient, index) in ingredients" :key="index" :name=ingredient.name :weight=ingredient.weight :matched=ingredient.matched 
               v-on:remove="removeRow(ingredient)"/>

           <div class="pt-2 justify-end">
               <button class="p-2 bg-green-200 rounded"
               @click="addIngredient">
                +
               </button>
           </div>
        </div>
    </div>
</template>

<script>
import { db } from '../firebaseDB.js'
import Ingredient from './Ingredient.vue'

export default {
  name: 'IngredientEditor',
  inject: ["meal"],
  components: {
      Ingredient
  },
  data() {
    return {
        mealName: "",
        mealKey: "",
        ingredients: [],
        selectedMeal: this.meal.value 
    }
  },
  mounted() {
    this.mealName = this.meal.value.name
    this.mealKey = this.meal.value.key

    if(this.mealKey === undefined || this.mealKey === '') return;
    this.ingredients = []
    db.collection('meals').doc(this.mealKey).collection('ingredients').onSnapshot((snapshotChange) => {
        snapshotChange.forEach((doc) => {
            this.ingredients.push({
                name: doc.data().name,
                weight: doc.data().weight,
                matched: doc.data().matched
            })  
        });
    });
  },
  methods: {
      removeRow(val) {  
          this.ingredients = this.ingredients.filter(item => item !== val)
      },
      addIngredient() {
          this.ingredients.push({
              name: "",
              weight: 0,
              matched: ""
          })
      }
  }
}
</script>

<style scoped>
</style>
