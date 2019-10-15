<template>
  <div class="selectlist form-group">
    <select
        class="form-control" 
        :name="name" 
        :multiple="size > 1" 
        :size="size"
        @input="selectedOptionsChanged($event.target)"

      >
      <option
        v-for="(opt, index) in options"
        :key="name + 'option_' + index"
        :value="valueFor(opt)"
        :selected="isSelected(valueFor(opt))"
      >{{labelFor(opt)}}</option>
    </select>
  </div>
</template>

<script>
export default {

  name: "SelectList",

  model: {
    prop: "selectedOptions",
    event: "listupdate"
  },

  props: {
    name: {
      type: String,
      required: true
    },
    
    options: {
      type: [Object, Array],
      required: false
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
      default: ""
    },

    size: {
      type: Number,
      required: false,
      default: 1
    }
  },

  mounted: function() {},
  computed: {},
  methods: {


    /**
     * Return the object property in the location specified by the labelKey
     * prop. If no labelKey defined, return the object itself. 
     */
    labelFor: function(obj) {
      var label = obj;
      if(this.valueKey) {
        label = obj[this.labelKey];
      }
      return label;
    },

    /**
     * Return the object property in the location specified by the valueKey
     * prop. If no valueKey defined, return the object itself. 
     */
    valueFor: function(obj) {
      var val = obj;
      if(this.valueKey) {
        val = obj[this.valueKey];
      }
      return val;
    },

    isSelected: function(val) {
      var selo = this.selectedOptions;
      var idx = selo.indexOf(val);
      return idx > -1;
    },

    selectedOptionsChanged: function(sel) {
      console.log("options changed");
      
     this.selectedOptions.splice(0, this.selectedOptions.length);
      for(var i = 0; i < sel.options.length; i++) {
        if(sel.options[i].selected) {
          this.selectedOptions.push(this.valueFor(this.options[i]));
        }
      }


    }
  }
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