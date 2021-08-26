// ~/plugins/vuex-persist.js
// eslint-disable-next-line import/no-named-as-default
import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => {
      return {
        name: state.name,
        userId: state.userId
      }
    }
  }).plugin(store)
}
