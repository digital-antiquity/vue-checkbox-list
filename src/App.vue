<template>
  <div id="app">
    <HelloWorld msg="VueDAR Component Demo" />
    <form>
      <fieldset class="demo-options">
        <legend>Demo Options</legend>
        <div class="form-control">
          <label for="selDatasource">Data Source</label>
          <SelectList 
            name="dataSource"
            :size="1"
            :options="columns"
            labelKey="name"
            valueKey="name"
            v-model="selectedDatasourceList"
          />
        </div>

        <div class="form-control">
          <label>Viewable Controls</label>
          <label>
            <input type="checkbox" v-model="bShowSelectList" />SelectList
          </label>
          <label>
            <input type="checkbox" v-model="bShowCheckboxList" />CheckboxList
          </label>
        </div>

        <div class="form-control">
          <label>Actions</label>
          <br />
          <button type="button" class="btn" @click="selectAll">Select All</button>
          <button type="button" class="btn" @click="selectRandom">Select Random</button>
          <button type="button" class="btn" @click="selectNone">Select None</button> •
          <button type="button" class="btn" @click="serialize">Serialize</button>
          <button type="button" class="btn" @click="deserialize">Deserialize</button>
        </div>
      </fieldset>


      <fieldset>
        <legend>
          Select List
          <span v-if="!bShowSelectList">(hidden)</span>
        </legend>
        <SelectList v-if="bShowSelectList" 
            name="myselectlist" 
            :size="10" 
            :options="optionsMap[datasource]" 
            labelKey="label"
            valueKey="value"
            v-model="selectedItems"
        />
      </fieldset>

      <fieldset>
        <legend>
          Checkbox List
          <span v-if="!bShowCheckboxList">(hidden)</span>
        </legend>
        <CheckboxList v-if="bShowCheckboxList" :choices="optionsMap[datasource]" v-model="selectedItems" />
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

var _random = Math.random.bind(Math);

function deepclone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// return a map of dataset columns keyed by column name
// todo: make this keyed by columnId maybe
function getdata() {
  var datasetColumns = Mimdata.datasetReferences[0].columns;
  var columns = deepclone(datasetColumns);
  return columns
}

function generateOptions(column) {
  var columnValues = column.values;
  var opts = columnValues.map(v => ({ label: v, value: v }));
  return opts;
}


export default {
  name: "App",
  components: { HelloWorld, CheckboxList, SelectList },
  data: function() {
    var columns = getdata();
    var columnMap = columns.reduce((obj, column) => {
      obj[column.name] = column;
      return obj; 
    }, {});


    var columnOptionsMap = columns.reduce((obj, column)=> {
      var opts = column.values.map(v => ({ label: v, value: v }));
      obj[column.name] = opts;
      return obj;
    },{})
    

    return {
      lovingVue: false,

      columns: columns,
      columnMap: columnMap,
      optionsMap: columnOptionsMap,

      selectedItems: [],
      myoptions: generateOptions(columnMap["figurative_specific"]),

      /// Demo Options
      bShowCheckboxList: false,
      bShowSelectList: true,
      selectedDatasourceList: []
    };
  },

  methods: {
    doupdate: function() {
      console.log("doupdate");
    },

    sendOuterUpdate: function() {
      this.selectedItems = ["1", "3"];
      this.$set(this.selectedItems, 0, "1");
    },

    clear: function() {
      this.bShowCheckboxList = true;
      this.bShowSelectList = true;
    },

    selectAll: function() {

    },

    selectRandom: function() {
      return _random();
    },

    selectNone: function() {
    },

    serialize: function() {
    },

    deserialize: function() {
    },
  },

  computed: {
    datasource: function(){
      var ret = "";
      if(this.selectedDatasourceList.length > 0) {
        ret = this.selectedDatasourceList[0]
      }
      return ret;
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
  text-align: left;
  border-radius: 6pt;
  border: 2pt solid #ccc;
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

select[multiple] {
  border-radius: 5pt;
}
</style>

