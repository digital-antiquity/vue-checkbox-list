<template>
  <div class="selectlist">
    <select :name="name" :multiple="size > 1" :size="size" class>
      <option
        v-for="(option, index) in options"
        :key="name + 'option_' + index"
        :value="option.value"
      >{{option.label}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectList",
  props: {
    name: {
      type: String,
      required: true
    },
    options: {
      type: [Object, Array],
      required: true
    },
    selectedOptions: {
      required: false,
      type: Array,
      default: function() {
        return [];
      }
    },
    labelKey: {
      type: String,
      required: false,
      default: "label"
    },
    valueKey: {
      type: String,
      required: false,
      default: "value"
    },
    size: {
      type: Number,
      required: false,
      default: 1
    }
  },

  mounted: function() {},
  computed: {},
  methods: {}
};
</script>



<style scoped>
div.selectlist, option {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

label,
option {
  font-size: 14pt;
}
</style>