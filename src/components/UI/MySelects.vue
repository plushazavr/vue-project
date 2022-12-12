<template>
  <select v-model="modelValue" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<style scoped>
</style>

<script>
export default {
  data() {
    return {
      modelValue: ''
    }
  },
  name: 'my-selects',
  props: {
    // так не работает, надо прописать в дате modelValue как погайду Vue3
    // modelValue: {
    //   type: String
    // },
    options: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>