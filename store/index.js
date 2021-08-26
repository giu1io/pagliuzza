import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  name: null,
  userId: uuidv4()
})

export const getters = {
  name: state => state.name,
  userId: state => state.userId
}

export const mutations = {
  setName (state, name) {
    state.name = name
  }
}
