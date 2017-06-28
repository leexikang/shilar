<template>
<div>
        <v-dialog
          persistent
          v-model="modal"
          lazy
        >
          <v-text-field
            slot="activator"
            label="Chose Date"
            v-model="e3"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="e3" scrollable>
            <template scope="{ save, cancel }">
              <v-card-row actions>
                <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
              </v-card-row>
            </template>
          </v-date-picker>
        </v-dialog>
      </div> 
</template>


<script>

export default{
    props: ['default'],
    data () {
      return {
        e3: this.default,
        menu: false,
        modal: false,
      }
    },
    watch: {
      e3: function(){
        this.$emit("changed",this.e3)
      }
    },
    created(){
        // this.e3: moment().format("YYYY-MM-DD"),
        // this.$emit("default",this.e3)
    }

}
</script>
