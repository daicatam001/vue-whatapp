<template>
  <div class="edit-information">
    <div class="panel">
      <div class="title">{{$t('yourName')}}</div>
      <div class="content">
        <div class="wrapper" v-if="!isEditName">
          <span>{{ fullName }}</span>
          <Pencil @click="editingName" />
        </div>
        <div class="wrapper input-wrapper" v-else>
          <form @submit.prevent="editedName">
            <input type="text" :value="fullName" ref="inputName" />
            <button><Checkmark /></button>
          </form>
        </div>
      </div>
    </div>
    <div class="note">
      <span>
        {{$t('yourNameNote')}}
      </span>
    </div>
    <div class="panel">
      <div class="title">{{$t('introduce')}}</div>
      <div class="content">
        <div class="wrapper" v-if="!isEditIntro">
          <span>{{ introduce }}</span>
          <Pencil @click="editingIntro" />
        </div>
        <div class="wrapper input-wrapper" v-else>
          <form @submit.prevent="editedIntro">
            <input type="text" :value="introduce" ref="inputIntro" />
            <button><Checkmark /></button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  computed: {
    fullName() {
      return this.$store.getters['auth/fullName']
    },
    customInfo() {
      return this.$store.getters['auth/customInfo']
    },
    introduce() {
      return this.$store.getters['auth/introduce']
    }
  },
  data() {
    return {
      isEditName: false,
      isEditIntro: false
    }
  },
  methods: {
    editingName() {
      this.isEditName = true
      setTimeout(() => {
        this.$refs.inputName.focus()
      })
    },
    editedName() {
      const fullName = this.$refs.inputName.value.trim()
      if (!fullName) {
        this.$notification.warn({ message: 'Tên bạn không thể bỏ trống' })
        return
      }
      this.isEditName = false
      if (this.fullName === fullName) {
        return
      }
      this.$store.dispatch('auth/update', { first_name: fullName })
    },
    editingIntro() {
      this.isEditIntro = true
      setTimeout(() => {
        this.$refs.inputIntro.focus()
      })
    },
    editedIntro() {
      const introduce = this.$refs.inputIntro.value.trim()
      if (!introduce) {
        this.$notification.warn({ message: 'Giới thiệu không thể bỏ trống' })
        return
      }
      this.isEditIntro = false
      if (this.introduce === introduce) {
        return
      }
      this.$store.dispatch('auth/update', {
        custom_json: { ...this.customInfo, introduce }
      })
    }
  }
})
</script>

<style scoped lang="scss">
.panel {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 3px 0px;
  padding: 15px 30px;
  .title {
    color: rgb(0, 150, 136);
  }
  .content {
    margin-top: 20px;
    .wrapper {
      font-size: 17px;
      position: relative;
      padding-bottom: 5px;
      &.input-wrapper {
        padding-bottom: 3px;
        border-bottom: 2px solid rgb(0, 191, 165);
      }
      button,
      svg {
        border: 0;
        background-color: transparent;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      input {
        display: block;
        width: 100%;
        border: 0;
        padding: 0;
        outline: 0;
      }
    }
  }
}
.note {
  padding: 15px 30px;
  color: rgba(0, 0, 0, 0.45);
}
</style>