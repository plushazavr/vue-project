<template>
  <div
    v-if="show"
    @click="hidePopup"
    class="popup">
    <div @click.stop class="popup__container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.popup {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup__container {
  width: 430px;
  min-height: 330px;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 30px 15px;
}
</style>

<script>
import toggleMixin from '@/mixins/toggleMixin';

export default {
  name: 'my-popups',
  mixins: [toggleMixin],
}
</script>