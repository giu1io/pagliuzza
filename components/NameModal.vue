<template>
  <Modal @close="close">
    <form @submit="$event.preventDefault(); save()">
      <div class="content input">
        <input :placeholder="placeholder" class="basic-text" :value="name" type="text" @input="inputValue = $event.target.value">
      </div>
      <div class="content buttons">
        <button class="basic-button" type="button" @click="close">
          {{ $t('name_modal.cancel') }}
        </button>
        <button class="basic-button" type="submit">
          {{ $t('name_modal.save') }}
        </button>
      </div>
    </form>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      inputValue: this.name
    }
  },
  computed: {
    ...mapGetters(['name']),
    placeholder () {
      return `${this.$i18n.t('name_modal.your_name')}...`
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    save () {
      // this.$store.setName()
      this.$store.commit('setName', this.inputValue || this.name)
      this.$emit('saved', this.inputValue)
    }
  }
}
</script>

<style scoped>
  .content.input {
    margin-bottom: 15px;
    text-align: center;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
</style>
