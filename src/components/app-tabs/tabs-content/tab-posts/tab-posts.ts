import { defineComponent } from 'vue';
import Api from '@/helpers/api';

export default defineComponent({
  name: 'tabPosts',
  props: {
    posts: {
      type: Array,
      required: true
    },
    getUserByPostId: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      comments: null as any[] | null
    };
  },
  methods: {
    getNameUser(userId: number): string {
      return this.getUserByPostId(userId).name;
    },
    getCommentsByPostId(id: number): any[] | undefined {
      return this.comments?.filter((comment) => comment.postId === id);
    }
  },
  async created() {
    this.comments = await Api.get('comments');
  }
});
