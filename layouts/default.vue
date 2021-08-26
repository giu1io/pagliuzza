<template>
  <div id="page">
    <div id="header">
      <NuxtLink to="/">
        <img id="logo" src="/pagliuzza_logo.svg">
      </NuxtLink>
      <div id="username" @click="showModal = true">
        {{ name || `${$t('header.name')}...` }}
      </div>
      <NameModal
        v-if="showModal"
        @close="showModal = false"
        @saved="showModal = false"
      />
    </div>
    <content>
      <Nuxt />
    </content>
    <div id="footer">
      copyright &copy; 2021
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    showModal: false,
    showAlert: true
  }),
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style scoped>

  #header {
    padding: 5px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #logo {
    width: 200px;
  }

  #username {
    margin-right: 10px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
  }

  #footer {
    position: fixed;
    bottom: 0px;
    padding: 10px;
    text-align: center;
    width: 100%;
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%);
  }

</style>
