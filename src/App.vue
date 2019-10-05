<template>
    <div id="app">
        <HelloWorld msg="CheckboxList Demo" />
        <form>
            <fieldset>
                <legend>Checkbox List</legend>
                <CheckboxList :choices="myoptions" v-model="selectedItems" :size="10" />
            </fieldset>

            <fieldset>
                <legend>Select List</legend>
                <SelectList name="myselectlist" :options="myoptions" />
            </fieldset>

            <fieldset>
                <legend>Selected Values</legend>
                <div class="selected">
                    <code v-for="item in selectedItems" v-bind:key="item">{{item}}</code>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
import CheckboxList from "./components/CheckboxList";
import HelloWorld from "./components/HelloWorld";
import SelectList from "./components/SelectList";
import Mimdata from "./assets/mimdata.js";

function getdata() {
    var mimdata = Mimdata;
    var datasetReferences = mimdata.datasetReferences[0].columns
    var subdata = datasetReferences;
    var clone = deepclone(subdata);
    return clone;
}

function deepclone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function generateOptions(columnName){
    var columns = getdata().reduce( (obj, column) => {
        obj[column.name] = column;
        return obj;
    }, {});
    var columnValues = columns[columnName].values;
    var opts = columnValues.map( v => ({label: v, value: v}));
    return opts
}

export default {
    name: "App",
    components: { HelloWorld, CheckboxList, SelectList },
      data: function() {
        return {
          lovingVue: false,
          selectedItems: [],
          myoptions: generateOptions("figurative_specific")
        };
      },

    methods: {
        doupdate: function() {
            console.log("doupdate");
        },

        sendOuterUpdate: function() {
            this.selectedItems = ["1", "3"];
            this.$set(this.selectedItems, 0, "1");
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
    display: inline-block; 
    font-size: 14pt;
    color: #bbb;
    text-align: left;
    margin: 1em 0.5em;
    padding: 3px 4px;
    border: 1px solid #888;
    border-radius: 6px;
    line-height: normal;
}

label {
    font-size: 14pt;
}
</style>
