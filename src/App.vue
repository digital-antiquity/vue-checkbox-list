<template>
  <div id="app">
    <HelloWorld msg="CheckboxList Demo"/>
    <form>
      <fieldset>
        <legend>Checkbox List</legend>
        <CheckboxList :choices="myoptions" v-model="selectedItems" />
      </fieldset>

      <fieldset>
        <legend>Selected Values</legend>
        <code v-for="item in selectedItems" v-bind:key="item">{{item}}</code>
      </fieldset>
    </form>
    

  </div>
</template>

<script>
import CheckboxList from "./components/CheckboxList";
import HelloWorld from  "./components/HelloWorld"



export default {
  name: "App",
  components: {HelloWorld, CheckboxList},
  data: function() {
    return {
      lovingVue: false,
      selectedItems: [],
      myoptions: [
          { value: "1", label: "one" },
          { value: "2", label: "two" },
          { value: "3", label: "three" },
          { value: "4", label: "four" },
          { value: "5", label: "five" },
          { value: "6", label: "six" }
      ]
    };
  },
  methods: {
    doupdate: function() {
      console.log("doupdate")
    },


    sendOuterUpdate: function() {
      this.selectedItems = ["1", "3"];
      this.$set(this.selectedItems, 0, "1")
    }
  },
  watch: {
    listupdate: function() {
      console.log("listupdate event");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 10pt;
}

div.checkboxlist {
  text-align: left;
}

fieldset {
  margin: 10pt 0;
}
code {
  /* display: block; */
  font-size: 14pt;
  color: #bbb;
  text-align: justify;
  margin: 1em;
}

label {
  font-size: 14pt;
}
</style>
