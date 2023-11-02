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
      users: null as any[] | null,
      currentUserFilterPosts: null as null | any,
      alphabeticalSort: false
    };
  },
  computed: {
    isPostsList(): boolean {
      return this.currentTypeTab === ETabType.Posts;
    },
    currentPosts(): any[] | undefined | null {
      const sortedPosts =
        this.alphabeticalSort && Array.isArray(this.posts)
          ? [...this.posts]?.sort((a, b) => {
              const userNameA = this.getUserByPostId(a.userId).name;
              const userNameB = this.getUserByPostId(b.userId).name;

              return userNameA.localeCompare(userNameB);
            })
          : this.posts;

      return this.currentUserFilterPosts
        ? sortedPosts?.filter(
            (post) => post.userId === this.currentUserFilterPosts.id
          )
        : sortedPosts;
    }
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
    },
    getPostsByUser(user: any): void {
      this.changeCurrentTypeTab(ETabType.Posts);
      this.currentUserFilterPosts = user;
    },
    resetCurrentUserFilterPosts(): void {
      this.currentUserFilterPosts = null;
    },
    sort() {
      this.alphabeticalSort = !this.alphabeticalSort;
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
