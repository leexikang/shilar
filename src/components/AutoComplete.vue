<template>
  <div>
    <v-text-field
    name="input_input"
    label="Enter Name "
    v-model="input"
    id="text_input"
    @input="handleChange"
    @keyup.native="handleEnter($event)"
    autofocus
    ref="text_input"
    >
  </v-text-field>
  <v-card v-if="names.length > 0" class="upWard">
   <v-list>
   <div class="text-xs-center" v-if="fetching">
   <p >
      <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
    </p>
  </div>
    <v-list-item v-for="(name, index) in names" v-bind:key="index">
      <v-list-tile avatar ripple>
        <v-list-tile-content @mousedown.prevent="handleMouseDown(name)">
          <v-list-tile-title>{{ name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile >
      <v-divider v-if="index + 1 < names.length"></v-divider>
    </v-list-item>
  </v-list>
</v-card>
<br/><br/>
</div>
</template>
<script>
  export default{

    props: [
    "names",
    "fetching",
    ],
    data () {
      return {
        input: "",
      }
    },
    watch:{

    },
      methods: {
        
        handleChange(input){
          this.$emit("change", input);
        },
        
        handleMouseDown(name){
          // e.preventDefault()
          this.input =  name
          this.$emit("choose",  this.input)
        },
        handleEnter( e ){
          if(this.input){
            if( e.keyCode == 13){
              this.$emit("enter", this.input)
              this.input = ""
            }
            // this.input = ""
          }
        }
      },
      mounted(){
      },
      destroyed(){
      }
  }
</script>
<style>
  .upWard{
    margin-top: -38px;
  }
</style>