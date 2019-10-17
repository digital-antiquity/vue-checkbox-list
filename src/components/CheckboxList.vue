<template>
  <div class="checkboxlist d-flex flex-column flex-wrap" style="height:300px">
    <div class="form-check" v-for="item in choices" :key="item.value">
      <label class="form-check-label">
        <input
          class="form-check-input"
          type="checkbox"
          :name="name"
          v-bind:checked="isChecked(valueFor(item))"
          v-on:change="cbchanged(item.value, $event.target.checked)"
        />
        {{item.label}}
      </label>
    </div>
  </div>
</template>
 

<script>
export default {
  name: "CheckboxList",
  
  // FIXME: Is it really necessary to customize the component v-model directive here?
  // FIXME: Even if it is,  'items' and 'listupdate' are lame names.
  model: {
    prop: "items",
    event: "listupdate"
  },

  props: {
    msg: String,
    name: String,
    disabled: Boolean,
    
    choices: {
      required: true
    },
    
    items: {
      type: Array
    },

    labelKey: {
      type: String,
      required: false,
      default: function() {return ""}
    },

    valueKey: {
      type: String,
      required: false,
      default: function() {return ""}
    },
  },

  data: function() {
    return {};
  },

  methods: {
    cbchanged: function(val, itemChecked) {
      
      // FIXME: direct property manipulation is verboten, even if it appears to work here 
      var newItems = this.items.slice();
      if (itemChecked) {
        if (newItems.indexOf(val) === -1) {
          newItems.push(val);
        }
      } else {
        _removeByValue(newItems, val);
      }
      //inform parent about new value
      this.$emit("listupdate", newItems);
    },

    isChecked: function(val) {
      return this.items.indexOf(val) >= 0;
    },


    labelFor: function(opt) {
      return opt[this.labelKey];
    },

    valueFor: function(opt) {
      return opt[this.valueKey];
    },



  }
};

/**
 * Mutates an array by removing an element with a value equal to
 * the specified item, if such element exists. This method removes
 * at most one array element per call (rather than removing all
 * elements with a matching value).
 *
 * Returns true, if the method removed an element, otherwise false.
 */
function _removeByValue(arr, item) {
  var idx = arr.indexOf(item);
  if (idx >= 0) {
    arr.splice(idx, 1);
  }
  return idx >= 0;
}
</script>
