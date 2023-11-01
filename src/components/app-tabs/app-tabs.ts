import { defineComponent } from 'vue';
import appTab from '@/components/app-tabs/app-tab/app-tab.vue';
import { ETabType } from '@/components/app-tabs/app-tab/enums/tab-types-enum';
import tabPosts from '@/components/app-tabs/tabs-content/tab-posts/tab-posts.vue';
import tabUsers from '@/components/app-tabs/tabs-content/tab-users/tab-users.vue';
import Api from '@/helpers/api';

export default defineComponent({
  name: 'appTabs',
  components: {
    appTab,
    tabPosts,
    tabUsers
  },
  data() {
    return {
      currentTypeTab: 'posts',
      ETabType: ETabType,
      posts: null as any[] | null,
      users: null as any[] | null
    };
  },
  methods: {
    changeCurrentTypeTab(type: string): void {
      this.currentTypeTab = type;
    },
    getUserByPostId(userId: number) {
      return this.users?.find((user) => user.id === userId);
    },
    getCommentsById(userId: number) {
      return this.users?.find((user) => user.id === userId);
    }
  },
  async created() {
    const [posts, users] = await Promise.all([
      Api.get('posts'),
      Api.get('users')
    ]);

    this.posts = posts;
    this.users = users;
  }
});
