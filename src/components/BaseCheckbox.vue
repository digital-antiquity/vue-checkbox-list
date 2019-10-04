<template>
  <input
    type="checkbox"
    v-bind:checked="checked"
    v-on:change="$emit('yourmom', $event.target.checked)"
  />
</template>

<script>
export default {
  name: "base-checkbox",
  model: {
    prop: "checked",
    event: "yourmom"
  },
  props: {
    checked: Boolean
  }
};
</script>


<style scoped>
</style>