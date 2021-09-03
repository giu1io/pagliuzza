<template>
  <div id="page">
    <div id="header">
      <NuxtLink :to="localePath('/')">
        <img id="logo" src="/images/pagliuzza_logo.svg">
      </NuxtLink>
      <div>
        <button class="basic-button" @click="copy">
          <img src="/images/copy.svg" class="icon" alt="copy icon">
        </button>
        <client-only>
          <button v-if="canShare" class="basic-button" @click="share">
            <img src="/images/share.svg" class="icon" alt="share icon">
          </button>
        </client-only>
        <button id="username" class="basic-button" @click="showModal = true">
          {{ name || `${$t('header.name')}...` }}
        </button>
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
        – Fork me on <a rel="noreferrer" target="_blank" href="https://github.com/giu1io/pagliuzza">GitHub</a>
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
    ...mapGetters(['name']),
    canShare () {
      return process.client && typeof navigator.share === 'function'
    }
  },
  methods: {
    share () {
      navigator.share({ url: window.location })
        .catch(() => {})
    },
    copy () {
      navigator.clipboard.writeText(window.location)
        .then(() => this.$toast.success(this.$i18n.t('clipboard.success'), { duration: 4000 }))
        .catch(() => this.$toast.error(this.$i18n.t('errors.something_went_wrong')), { duration: 4000 })
    }
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
    width: 100px;
  }

  #username {
    margin-right: 10px;
  }

  .icon {
    width:15px;
    height:15px;
  }

  content {
    position: relative;
    display: block;
    margin-bottom: 200px;
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
    font-size: 0.8em;
  }

  @media screen and (min-width: 400px) {
    #logo {
      width: 200px;
    }

    #footer {
      font-size: inherit;
    }
  }

</style>
