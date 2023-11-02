import { defineComponent } from 'vue';

export default defineComponent({
  name: 'tabUsers',
  props: {
    users: {
      type: Array
    },
    getPostsLengthByUserId: {
      type: Function,
      required: true
    }
  },
  methods: {
    checkUserPosts(user: any) {
      this.$emit('checkUserPosts', user);
    },
    textButton(userId: number): string {
      return this.getPostsLengthByUserId(userId)
        ? 'Посмотреть посты пользователя'
        : 'Постов нет';
    }
  }
});
