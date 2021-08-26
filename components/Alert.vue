<template>
  <div>
    <Modal @close="close">
      <div class="message">
        {{ message }}
      </div>
      <div class="buttons">
        <button class="basic-button" type="button" @click="close">
          {{ $t('alert_modal.acknowledge') }}
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .message {
    margin-bottom: 15px;
    text-align: center;
  }
  .buttons {
    width: 100%;
    text-align: center;
  }
</style>
