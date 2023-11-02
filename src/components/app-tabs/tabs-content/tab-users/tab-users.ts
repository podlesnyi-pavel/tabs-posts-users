import { defineComponent } from 'vue';

export default defineComponent({
  name: 'tabUsers',
  props: {
    users: {
      type: Array
    }
  },
  methods: {
    checkUserPosts(user: any) {
      this.$emit('checkUserPosts', user);
    }
  }
});
