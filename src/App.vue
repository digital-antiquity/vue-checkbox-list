<template>
  <div id="app">
    <HelloWorld msg="Hello Vue in CodeSandbox!"/>
    <h1>form</h1>
    <form>
      <fieldset>
        <CheckboxList :choices="myoptions" v-model="selectedItems" />
      </fieldset>
    </form>
    Outer Selected Items: {{selectedItems}}
    <br/>
    <button type="button" @click="sendOuterUpdate">send outer update</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import CheckboxList from "./components/CheckboxList";
export default {
  name: "App",
  components: {
    HelloWorld,
    CheckboxList
  },
  data: function() {
    return {
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
    sendOuterUpdate: function() {
      this.selectedItems = ["1", "3"];
      this.$set(this.selectedItems, 0, "1")
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
}
</style>
