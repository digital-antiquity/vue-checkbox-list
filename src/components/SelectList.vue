<template>
  <div class="selectlist">
    <select 
        :name="name" 
        :multiple="size > 1" 
        :size="size"
        @input="selectedOptionsChanged($event.target)"

      >
      <option
        v-for="(opt, index) in options"
        :key="name + 'option_' + index"
        :value="opt.value"
        :selected="isSelected(valueFor(opt))"
      >{{opt.label}}</option>
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
  methods: {
    labelFor: function(opt) {
      return opt[this.labelKey];
    },

    valueFor: function(opt) {
      return opt[this.valueKey];
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


function _removeByValue(arr, item) {
  var idx = arr.indexOf(item);
  if (idx >= 0) {
    arr.splice(idx, 1);
  }
  return idx >= 0;
}

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