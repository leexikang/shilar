<template>

<v-toolbar fixed class="indigo darken-4" light>
      <v-toolbar-side-icon persistent light @click.native.stop="toggleSlider"></v-toolbar-side-icon>
      <v-toolbar-title> MGEC </v-toolbar-title>
    </v-toolbar>

</template>

<script>
  export default {

      methods: {
        toggleSlider()
        {
            this.$emit("toggleSlider")
        }
      }

  }
</script>
