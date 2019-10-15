<template>
  <div id="app" class="container-fluid">
    <HelloWorld msg="VueDAR™ Component Demo" />
    <form class="form">
      <fieldset class=" demo-options">
        <legend>Demo Options</legend>
        <div class="">
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

        <div class="">
          <label>Viewable Controls</label>
          <label>
            <input type="checkbox" v-model="bShowSelectList" />SelectList
          </label>
          <label>
            <input type="checkbox" v-model="bShowCheckboxList" />CheckboxList
          </label>
          <label><input type="checkbox" v-model="bShowJson">JSON</label>
        </div>

        <div class="">
          <label>Actions (coming soon)</label>
          <br />
          <button disabled type="button" class="btn" @click="selectAll">Select All</button>
          <button disabled type="button" class="btn" @click="selectRandom">Select Random</button>
          <button disabled type="button" class="btn" @click="selectNone">Select None</button> &nbsp;&nbsp;
          <button disabled type="button" class="btn" @click="serialize">Serialize</button>
          <button disabled type="button" class="btn" @click="deserialize">Deserialize</button>
        </div>
      </fieldset>


      <fieldset>
        <legend>
          Select List
          <span v-if="!bShowSelectList">(hidden)</span>
        </legend>
        <div class="scrollbox" v-if="bShowSelectList" >
            <SelectList  
                name="myselectlist" 
                :size="10" 
                :options="optionsMap[datasource]" 
                v-if="optionsMap[datasource]" 
                labelKey="label"
                valueKey="value"
                v-model="selectedItems"
            />
        </div>
      </fieldset>

      <fieldset>
        <legend>
          Checkbox List
          <span v-if="!bShowCheckboxList">(hidden)</span>
        </legend>
        <div class="scrollbox" v-if="bShowCheckboxList">
            <CheckboxList  
                :choices="optionsMap[datasource]" 
                v-if="optionsMap[datasource]" 
                v-model="selectedItems" 
                labelKey="label"
                valueKey="value" />
        </div>
      </fieldset>

      <fieldset v-if="false">
        <legend>Selected Values</legend>
        <div class="selected">
          <code v-for="item in selectedItems" v-bind:key="item">{{item}}</code>
        </div>
      </fieldset>

      <fieldset v-show="bShowJson">
          <legend>JSON Output</legend>
          <div class="scrollbox">
              {{jsonoutput}}
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
      bShowCheckboxList: true,
      bShowSelectList: true,
      bShowJson: false,
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
    },

    jsonoutput: function() {
        var ret = ""
        if(this.selectedItems){
            ret =  JSON.stringify(this.selectedItems, null, 4);
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
  margin: 8pt;
}

div.checkboxlist {
  text-align: left;
}

fieldset {
  margin: 5pt 0 25pt 0;
  text-align: left;
  border-radius: 6pt;
  border: 2pt solid #ccc;
  /* background-color: #fdfdfe; */
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
  margin-right: 5pt;
}

select[multiple] {
  border-radius: 5pt;
}

div.scrollbox {
    height: 210pt;
    max-height: 225pt;
    overflow-y: scroll;
}

</style>

