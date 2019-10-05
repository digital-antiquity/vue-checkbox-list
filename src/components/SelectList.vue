<template>
<div class="selectlist">
    <h2> Select List goes here</h2>
    <select :name="name" :multiple="size > 1" :size="size" class="">
        <option  
            v-for="(option, index) in options" 
            :key="name + 'option_' + index"
            :value="option.value"
            
            >Option {{option.label}}</option>
    </select>
</div>
    
</template>

<script>
export default {
    name:"SelectList",
    props: {
        "name": {
            type: String,
            required: true
        },
        "options": {
            type: [Object, Array],
            required: true
        },
        "selectedOptions": {
            required: false, 
            type: Array,
            default: function() {
                return []
            }
        },
        "labelKey": {
            type: String,
            required: false,
            default: "label"
        },
        "valueKey": {
            type: String,
            required: false,
            default: "value"
        },
        "size": {
            type: Number,
            required: false, 
            default: 1
        }
    },

    mounted: function() {},
    computed: {},
    methods: {},

}
</script>



<style scoped>

</style>