<template>
  <div class="chat-detail-members">
    <div class="members-title">
      <div class="block-title-text">
        {{ $t('memberCount', { number: people.length }) }}
      </div>
      <Search />
    </div>
    <div class="member-item" v-if="chat.admin.username === username">
      <div class="action-icon">
        <div class="action-icon-wrapper">
          <AddUser />
        </div>
      </div>
      <div class="action-label">
        {{ $t('addMember') }}
      </div>
    </div>
    <div class="member-item" v-if="chat.admin.username === username">
      <div class="action-icon">
        <div class="action-icon-wrapper">
          <Link />
        </div>
      </div>
      <div class="action-label">
        {{ $t('inviteJoinGroupByLink') }}
      </div>
    </div>
    <div class="member-item" v-for="member of people" :key="member.username">
      <div class="action-icon">
        <Avatar />
      </div>
      <div class="action-member">
        <div class="line-1">
          <div class="member-name action-label">
            {{
              member.person.username === username
                ? $t('you')
                : member.person.first_name
            }}
          </div>
          <div class="member-admin-wrapper" v-if="member.person.username === chat.admin.username">
            <div class="member-admin">
              {{ $t('adminGroup') }}
            </div>
          </div>
        </div>
        <div class="line-2">
          <div class="member-intro">
            {{ member.person.custom_json.introduce }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.getters['auth/username']
    },
    chat() {
      return this.$store.getters['chat/chat']
    },
    people() {
      return [...this.chat.people].sort((a) => {
        if (a.person.username === this.username) {
          return -1
        }
        return 1
      })
    }
  }
}
</script>

<style scoped lang="scss">
.members-title {
  padding: 14px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.member-item {
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 14px;
  border-top: 1px solid #f2f2f2;
}
.action-icon {
  padding: 0 15px 0 13px;
}
.action-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: #009688;
  border-radius: 50%;
  color: white;
}
.action-label {
  font-size: 17px;
}
.action-member {
  flex-grow: 1;
  padding-right: 15px;
  .line-1 {
    display: flex;
    align-items: center;
    > * {
      flex-grow: 1;
      flex-basis: 0;
    }
  }
  .line-2 {
    min-height: 20px;
  }
}
.member-intro {
  font-size: 13px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.6);
}
.member-admin-wrapper{
    text-align: right;
}
.member-admin {
  padding: 1px 5px 0;
  border: 1px solid rgb(7, 188, 76);
  display: inline-block;
  border-radius: 3px;
  height: 16px;
  font-size: 11px;
  line-height: 12px;
  color: rgb(7, 188, 76);
}
</style>