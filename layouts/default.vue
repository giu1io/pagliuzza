<template>
  <div id="page">
    <div id="header">
      <NuxtLink to="/">
        <img id="logo" src="/images/pagliuzza_logo.svg">
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
      <span>
        &copy; {{ year }}
        <a rel="noreferrer" target="_blank" href="https://giuliomontagner.com">Giulio Montagner</a>
        – Fork me on <a rel="noreferrer" target="_blank" href="https://github.com/giu1io">GitHub</a>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getYear } from 'date-fns'

export default {
  data: () => ({
    showModal: false,
    showAlert: true,
    year: getYear(new Date())
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
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: fixed;
    bottom: 0px;
    padding: 10px;
    width: 100%;
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%);
  }

</style>
