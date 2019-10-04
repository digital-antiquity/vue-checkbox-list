<template>
  <div class="checkboxlist">
    <div v-for="item in choices" :key="item.value">
      <label>
        <input
          type="checkbox"
          :name="name"
          v-bind:checked="isChecked(item.value)"
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
    }
  },
  data: function() {
    return {
      selectedItems: []
    };
  },

  methods: {
    cbchanged: function(val, itemChecked) {
      //compare previsu
      if (itemChecked) {
        if (this.items.indexOf(val) === -1) {
          this.items.push(val);
        }
      } else {
        _removeByValue(this.items, val);
      }
      console.log("cbchanged");
      // this.$emit('listupdate', this.items);
      // this.$emit('input', this.items);
    },

    isChecked: function(val) {
      return this.items.indexOf(val) >= 0;
    }
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
