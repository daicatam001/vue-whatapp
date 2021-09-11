<template>
  <div class="chat-detail">
    <ChatDetailHeading />
    <div class="detail-body-wrapper">
      <div class="detail-body scroll-element">
        <div class="user-block block">
          <UserCard type="big" />
        </div>
        <div class="media-block block">
          <div class="media-title">
            <div class="title-text">
              {{ $t('mediaAll') }}
            </div>
            <ChevronRight />
          </div>
          <div class="media-body">
            <div class="no-media">
              {{ $t('noMediaAll') }}
            </div>
          </div>
        </div>
        <div class="message-block block">
          <div class="list-item">
            <div class="item-title">
              {{ $t('offNotification') }}
            </div>
            <div class="action-icon">
              <ChevronRight />
            </div>
          </div>
          <div class="list-item">
            <div class="item-title">
              {{ $t('messageMarkStar') }}
            </div>
            <div class="action-icon">
              <ChevronRight />
            </div>
          </div>
          <div class="list-item">
            <div class="item-title">
              {{ $t('selfDestroyMessage') }}
            </div>
            <div class="action-icon">
              <ChevronRight />
            </div>
          </div>
        </div>
        <div class="intro-block block">
          <div class="intro-title">
            <div class="title-text">
              {{ $t('introAndPhone') }}
            </div>
          </div>
          <div class="list-item">
            <div class="item-title">
              {{ introduce }}
            </div>
          </div>
          <div class="list-item">
            <div class="item-title">
              {{ username }}
            </div>
          </div>
        </div>
        <div class="danger-block block">
          <div class="danger-icon">
            <Ban />
          </div>
          <div class="danger-label">
            {{$t('ban')}}
          </div>
        </div>
        <div class="danger-block block">
          <div class="danger-icon">
            <ThumbDown />
          </div>
          <div class="danger-label">
            {{$t('reportUser')}}
          </div>
        </div>
        <div class="danger-block block">
          <div class="danger-icon">
            <Trash />
          </div>
          <div class="danger-label">
            {{$t('deleteChat')}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { UserInfo } from '@/core/models/users'
import { defineComponent } from '@vue/runtime-core'
import ChatDetailHeading from './ChatDetailHeading.vue'

export default defineComponent({
  components: {
    ChatDetailHeading
  },
  computed: {
    person(): UserInfo {
      return this.$store.getters['chat/directUser'].person
    },
    username(): string {
      return this.person.username
    },
    introduce(): string {
      try {
        return JSON.parse(this.person.custom_json as string).introduce
      } catch (e) {
        return ''
      }
    }
  }
})
</script>

<style scoped lang="scss">
.chat-detail {
  background-color: rgb(237, 237, 237);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.chat-detail-header {
  flex-shrink: 0;
}
.detail-body-wrapper {
  flex-grow: 1;
  position: relative;
}
.detail-body {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.block {
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 3px 0px;
  margin-bottom: 10px;
  background-color: white;
}
.user-block {
  padding: 28px 30px 19px;
}
.media-block {
  padding: 14px 30px 10px;
  .media-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-text {
      color: rgb(0, 150, 136);
      font-size: 14px;
    }
  }
  .media-body {
    .no-media {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 45px;
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
.list-item {
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  + .list-item {
    border-top: 1px solid #f2f2f2;
  }
  .item-title {
    font-size: 17px;
    color: #000;
  }
}
.intro-block {
  .intro-title {
    padding: 14px 30px 10px;
    .title-text {
      color: rgb(0, 150, 136);
      font-size: 14px;
    }
  }
}
.danger-block {
  position: relative;
  display: flex;
  flex: none;
  align-items: center;
  height: 60px;
  .danger-icon {
    display: flex;
    justify-content: center;
    width: 74px;
  }
  .danger-label{
    color: #df3333;
    font-size: 17px;
    line-height: 21px;
  }
}
</style>