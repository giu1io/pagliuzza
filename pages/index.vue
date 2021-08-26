<template>
  <div class="main">
    <img src="/images/boy-on-hay-bale.png">
    <form :action="roomId">
      <div class="input-container">
        <input v-model="roomId" type="text" class="basic-text" :placeholder="$t('home.room_name_placeholder')">
      </div>
      <div>
        <button class="basic-button" type="submit">
          {{ $t('home.go_to_room') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { generateSlug } from 'random-word-slugs'

export default {
  data () {
    return {
      roomId: generateSlug(4)
    }
  }
}
</script>

<style scoped>
  .main {
    text-align: center;
  }

  .main > img {
    max-width: 300px;
    margin-bottom: 15px;
  }

  .basic-text {
    max-width: 300px;
  }

  .input-container {
    margin-bottom: 15px;
  }
</style>
