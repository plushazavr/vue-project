<template>
    <button class="btn"><slot></slot></button>
</template>

<style>
.btn {
  margin-top: 10px;
  align-self: flex-start;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  cursor: pointer;
}

.btn:hover {
  color: white;
  background-color: teal;
}
</style>

<script>
export default {
  name: 'my-buttons'
}
</script>