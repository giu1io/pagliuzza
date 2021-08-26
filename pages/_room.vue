<template>
  <div id="main">
    <NameModal
      v-if="showModal"
      @close="showModal = false"
      @saved="showModal = false; pick(lastPicked)"
    />
    <Alert
      v-if="showAlert"
      :message="$t('errors.stick_already_picked')"
      @close="showAlert = false"
    />
    <transition-group name="picked" class="picked" tag="ul" @after-enter="sort">
      <li v-for="item in picked" :key="item.id" class="picked-item" :style="{ 'background-color': item.color, 'width': `calc(${item.length}% - 20px)` }">
        <span>{{ item.name }}</span>
        <span class="picked-length">{{ item.length }}</span>
      </li>
    </transition-group>
    <div class="straws-container-wrapper">
      <div class="straws-container">
        <transition-group name="straws" tag="ul" class="straws" @after-enter="sort">
          <li
            v-for="item in straws"
            :key="item.id"
            class="straw-item"
            :style="{ 'background-color': item.color }"
            @click="pick(item)"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import socket from '~/plugins/socket.io.js'

export default {
  asyncData ({ params: { room: roomId } }) {
    return new Promise(resolve =>
      socket.emit('get-room', roomId, ({ picked, straws }) => resolve({ picked, straws, roomId }))
    )
  },
  data () {
    return {
      showModal: false,
      showAlert: false,
      lastPicked: null
    }
  },
  computed: {
    ...mapGetters(['name', 'userId'])
  },
  mounted () {
    socket.emit('subscribe', this.roomId)

    socket.on('picked', item => this.pickedCallback(item))
  },
  methods: {
    sort () {
      this.picked = this.picked.sort((a, b) => a.length > b.length ? 1 : -1)
    },
    pick (item) {
      if (!this.name) {
        this.showModal = true
        this.lastPicked = item
        return
      }

      if (this.picked.find(i => i.userId === this.userId)) {
        this.showAlert = true
        return
      }

      socket.emit('pick', {
        strawId: item.id,
        roomId: this.roomId,
        name: this.name,
        userId: this.userId
      }, item => this.pickedCallback(item))
    },
    pickedCallback (item) {
      if (!item) {
        return
      }

      this.straws.splice(this.straws.findIndex(i => i.id === item.id), 1)
      this.picked.unshift(item)
    }
  }
}
</script>

<style scoped>
#main {
    margin: 0;
}

ul.picked {
  list-style-type: none;
  list-style: none;
  margin: 0;
  padding: 0;
}

.picked-item {
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.picked-length {
  margin-left: 10px;
}

.picked-enter-active, .picked-leave-active {
  transition: all 1s;
}
.picked-enter, .picked-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
.picked-move {
  transition: transform 1s;
}

.straws-container-wrapper {
  position: fixed;
  bottom: 0px;
  width: 100%;
}

.straws-container {
  overflow: auto;
  white-space: nowrap;
}

ul.straws {
  list-style-type: none;
  list-style: none;
  margin: 0;
  padding: 0;
}

.straw-item {
  display: inline-block;
  height: 150px;
  width: 50px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  margin-left: 1px;
  margin-right: 1px;
}

.straw-item:hover {
  border: 1px solid black;
}

.straws-enter-active, .straws-leave-active {
  transition: all 1.5s;
}
.straws-enter, .straws-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>
