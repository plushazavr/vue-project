<template>
  <input
    :value="modelValue"
    @input="updateInput"
    class="input"
    type="text">
</template>

<style scoped>
.input {
  max-width: 500px;
  min-width: 400px;
  border: 1px solid teal;
  padding: 10px 15px;
  margin: 15px 0px;
}
</style>

<script>
export default {
  name: 'my-inputs',
  props: {
    modelValue: [String, Number]
  },

  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>