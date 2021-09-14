<template>
  <div class="chat-search" :class="{ searching: searching }">
    <div class="input-box">
      <div class="label-text" @click="onSearch">
        {{ $t('searchOrstartChat') }}
      </div>

      <input
        type="text"
        ref="inputSearch"
        v-model.trim="text"
        @blur="onBlur"
        @keyup.esc="offSearch"
        @input="doSearch"
      />
      <div class="ic ic-close" v-if="!!text">
        <!-- <Spinner size="20px" /> -->
        <Spinner size="20px" v-if="isSearching" />
        <Close v-else @click="clear" />
      </div>

      <div class="ic ic-search">
        <Search @click="onSearch" />
      </div>
      <div class="ic ic-back">
        <ArrowBack color="#33b7f6" @click="offSearch" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    newChatTitle() {
      return this.$store.getters['chats/newChatTitle']
    },
    isSearching() {
      return this.$store.getters['chats/isSearching']
    }
  },
  data() {
    return {
      searching: false,
      searchingTimer: null,
      text: ''
    }
  },
  methods: {
    onInput(e) {
      this.$store.dispatch('chats/onInput', e.target.value.trim())
    },
    createNewChat() {
      this.$store.dispatch('chats/createNewChat')
    },
    onSearch() {
      this.searching = true
      setTimeout(() => {
        this.$refs.inputSearch.focus()
      })
    },
    onBlur() {
      if (this.text === '') {
        this.offSearch()
      }
    },
    offSearch() {
      this.searching = false
      this.$refs.inputSearch.value = ''
      this.$store.dispatch('chats/offSearchChats')
    },
    doSearch() {
      clearTimeout(this.searchingTimer)
      this.searchingTimer = setTimeout(() => {
        this.$store.dispatch('chats/searchChats', this.text)
      }, 300)
    },
    clear() {
      this.text = ''
      this.$refs.inputSearch.focus()
    }
  }
}
</script>

<style scoped lang="scss">
.chat-search {
  background: #f6f6f6;
  transition: box-shadow 0.18s ease-out, background-color 0.25s ease-out;
  height: 50px;
  .label-text,
  .ic-search {
    opacity: 1;
  }
  input,
  .ic-back {
    opacity: 0;
    z-index: -1;
  }
  .arrow-back {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(0.8) rotate(-90deg);
  }

  &.searching {
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 3px 0px;
    .label-text,
    .ic-search {
      opacity: 0;
      z-index: -1;
    }
    input,
    .ic-back {
      opacity: 1;
      z-index: unset;
    }
    .arrow-back {
      transform: scale(1) rotate(0);
    }
  }
}
input,
input:focus-visible {
  border: 0;
  outline: 0;
}
.input-box {
  position: relative;
  height: 50px;
  .ic {
    position: absolute;
    display: flex;
    align-items: center;
    left: 20px;
    top: 50%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(-50%);
  }
}

input,
.label-text {
  padding: 7px 20px 7px 60px;
  height: 33px;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  position: absolute;
}
input {
  width: calc(100% - 30px);
}

.label-text {
  color: rgba(74, 74, 74, 0.6);
  border-radius: 30px;
  line-height: 18px;
  background-color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ic-close {
  right: 30px;
  left: unset !important;
}
</style>