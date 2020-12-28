<template>
    <div v-if="mealKey !== ''"> 
        <div class="p-2 border-2 border-gray-300 bg-white h-auto px-5 pr-16 rounded-lg text-sm">
             <input class="col-span-2 p-2 rounded"
                type="text" name="name" v-model="mealName" placeholder="name"
                autocomplete="off">
        </div>

        <div class="pt-2 pb-2 border-2 border-gray-300 bg-white h-auto px-5 pr-16 rounded-lg text-sm">
            ingredients:
               <Ingredient class="pt-2"
                v-for="(ingredient, index) in ingredients" :key="index" :name=ingredient.name :weight=ingredient.weight :matched=ingredient.matched 
               v-on:remove="removeRow(ingredient)"/>

           <div class="pt-2 justify-end">
               <button class="p-2 bg-green-200"
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
  props: ['meal'],
  components: {
      Ingredient
  },
  data() {
    return {
        mealName: "",
        mealKey: "",
        ingredients: []
    }
  },
  watch: {
    meal: function (val) {  
        this.mealKey = (val.key === undefined || val.key === '') ? "" : val.key
        this.mealName = (val.name === undefined || val.name === '' || val.key == 'custom') ? "" : val.name 
    },
    mealKey: function(val) {
        this.ingredients = []
        if(val === undefined || val === '') return;
        
        let ing = []
            db.collection('meals').doc(val).collection('ingredients').onSnapshot((snapshotChange) => {
            snapshotChange.forEach((doc) => {
                console.log(doc.data())
                ing.push({
                    name: doc.data().name,
                    weight: doc.data().weight,
                    matched: doc.data().matched
                })  
            });
            this.ingredients = ing
        });
    }
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
