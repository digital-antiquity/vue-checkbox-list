<style>
div.checkboxlist {
  text-align: left;
}
code {
  color: #ddd;
  margin-left: 1em;
}
</style>
<template>
  <div class="checkboxlist">
    <div v-for="item in choices" :key="item.value">
      <label>
        <input type="checkbox" :value="item.value" v-model="selectedItems" />
        {{item.label}}
      </label>
      <code>value:{{item.value}} label:{{item.label}} {{item}}</code>
    </div>
    inner selected items: {{selectedItems}}
    <br />
    <button type="button" @click="sendUpdate">update</button>
  </div>
</template>
 

<script>
export default {
  name: "CheckboxList",
  props: {
    msg: String,
    name: String,
    disabled: Boolean,
    choices: {
      required: true
    },
    value: { required: false }
    // labelKey: {
    //   type: String,
    //   default: "label"
    // },
    // valueKey: {
    //   type: String,
    //   default: "value"
    // }
  },
  data: function() {
    return {
      selectedItems: []
    };
  },

  methods: {
    sendUpdate: function() {
      console.log("component: sending update");
      this.$emit("input", this.selectedItems);
    }
  },
  watch: {
    selectedItems: function() {
      console.log("selected items changed");
      this.$emit("input", this.selectedItems);
    }
  }
};
</script>
