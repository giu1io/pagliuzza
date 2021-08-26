<template>
  <transition name="modal">
    <div class="modal-wrapper" @click="close">
      <div class="modal" @click.stop>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .modal-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
  }
  .modal {
    background-color: white;
    width: 300px;
    padding: 15px 10px 15px 10px;
    border-radius: 10px;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>
