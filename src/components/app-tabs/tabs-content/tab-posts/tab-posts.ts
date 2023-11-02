import { defineComponent } from 'vue';
import Api from '@/helpers/api';
import addComment from '@/components/add-comment/add-comment.vue';

export default defineComponent({
  name: 'tabPosts',
  components: {
    addComment
  },
  props: {
    posts: {
      type: Array
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
    },
    async addComment(data: any, postId: number) {
      const newPost = await Api.post('comments', {
        postId: postId,
        ...data
      });

      this.comments?.push(newPost);
    }
  },
  async created() {
    this.comments = await Api.get('comments');
  }
});
