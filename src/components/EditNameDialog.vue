<template>
  <v-layout row justify-center>
    <v-dialog :value="dialog" persistent>
      <!-- <v-btn primary light slot="activator">Open Dialog</v-btn> -->
      <v-card slot="default">
        <v-card-row>
          <!-- <v-card-title>Use Google's location service?</v-card-title> -->
        </v-card-row>
        <v-card-row>
          <v-card-text>

          <v-text-field
              :focus="focus"
              name="input-1"
              id="testing"
              :value="edit"
              @input.native="handleInput"
              ref="input_edit"
            />

            <input type="text" ref="input_test"/>
            
          </v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="green--text darken-1" flat="flat" @click.native="handleSave"> Save </v-btn>
          <v-btn class="green--text darken-1" flat=  "flat" @click.native="handleCancel"> Cancel </v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { debounce } from 'lodash'

  export default {
    props: ["dialog",
            "edit",
            ],
    data () {
      return {
            name: "",
            focus: false
      }
    },
    watch:{
      dialog: function(val){
        if( val === true){
          debounce(() => {
            this.$refs.input_test.focus()
          }, 5000)
        }
      }
    },
    methods: {
      handleInput(e){
        this.name = e.target.value
      },
      handleSave(){
        // this.edit.name = this.name
        this.$emit('save', this.name)
      },
      handleCancel(){
        this.$emit('cancel')
        this.name = ""
      }
    },
    mounted(){
      // console.log(this.name)
    },
    destroyed(){
    }

  }

</script>