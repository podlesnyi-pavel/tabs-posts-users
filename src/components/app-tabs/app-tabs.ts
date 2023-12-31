import { defineComponent } from 'vue';
import appTab from '@/components/app-tabs/app-tab/app-tab.vue';
import { ETabType } from '@/components/app-tabs/app-tab/enums/tab-types-enum';
import tabPosts from '@/components/app-tabs/tabs-content/tab-posts/tab-posts.vue';
import tabUsers from '@/components/app-tabs/tabs-content/tab-users/tab-users.vue';
import Api from '@/helpers/api';
import type { IUser } from '@/components/app-tabs/interfaces/user-interface';
import type { IPost } from '@/components/app-tabs/interfaces/post-interface';

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
      posts: null as IPost[] | null,
      users: null as IUser[] | null,
      currentUserFilterPosts: null as IUser | null,
      alphabeticalSort: false,
      postsToShow: 20,
      displayedPosts: [] as IPost[],
      postsbyUser: [] as IPost[] | [],
      displayedPostsbyUser: [] as IPost[]
    };
  },
  computed: {
    propsByTab(): any {
      switch (this.currentTypeTab) {
        case ETabType.Posts:
          return {
            posts: this.currentPosts,
            getUserByPostId: this.getUserByPostId
          };

        case ETabType.Users:
          return {
            users: this.users,
            getPostsLengthByUserId: this.getPostsLengthByUserId
          };

        default:
          return '';
      }
    },
    isPostsList(): boolean {
      return this.currentTypeTab === ETabType.Posts;
    },
    currentPosts(): IPost[] {
      if (this.alphabeticalSort) {
        return [...this.displayedPosts].sort((a, b) => {
          const userNameA = this.getUserByPostId(a.userId)?.name;
          const userNameB = this.getUserByPostId(b.userId)?.name;

          if (userNameA && userNameB) {
            return userNameA.localeCompare(userNameB);
          }

          return 0;
        });
      }

      return this.currentUserFilterPosts
        ? this.displayedPostsbyUser
        : this.displayedPosts;
    }
  },
  methods: {
    changeCurrentTypeTab(type: string): void {
      this.currentTypeTab = type;

      if (type === ETabType.Users) {
        this.displayedPosts = [];
        this.displayedPostsbyUser = [];
        this.loadMorePosts();
      }
    },
    getUserByPostId(userId: number) {
      return this.users?.find((user: IUser) => user.id === userId);
    },
    getPostsLengthByUserId(userId: number) {
      return this.posts?.filter((post) => post.userId === userId).length;
    },
    getCommentsById(userId: number): IUser | undefined {
      return this.users?.find((user: IUser) => user.id === userId);
    },
    getPostsByUser(user: IUser): void {
      this.changeCurrentTypeTab(ETabType.Posts);
      this.currentUserFilterPosts = user;

      if (this.posts) {
        this.postsbyUser = this.posts.filter(
          (post: IPost) => post.userId === this.currentUserFilterPosts?.id
        );

        this.loadMorePostsByUser();
      }
    },
    resetCurrentUserFilterPosts(): void {
      this.currentUserFilterPosts = null;
    },
    sort(): void {
      this.alphabeticalSort = !this.alphabeticalSort;
    },
    loadMorePosts(): void {
      if (this.posts) {
        const nextPosts = this.posts.slice(
          this.displayedPosts.length,
          this.displayedPosts.length + this.postsToShow
        );

        this.displayedPosts = this.displayedPosts.concat(nextPosts);
      }
    },
    loadMorePostsByUser(): void {
      if (this.postsbyUser) {
        const nextPosts = this.postsbyUser.slice(
          this.displayedPostsbyUser.length,
          this.displayedPostsbyUser.length + this.postsToShow
        );

        this.displayedPostsbyUser = this.displayedPostsbyUser.concat(nextPosts);
      }
    },
    handleScroll(): void {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (this.currentUserFilterPosts) {
          this.loadMorePostsByUser();
        } else {
          this.loadMorePosts();
        }
      }
    }
  },
  async created() {
    Promise.all([Api.get('posts'), Api.get('users')])
      .then((promise) => {
        const [posts, users] = promise;
        this.posts = posts;
        this.users = users;
      })
      .then(() => this.loadMorePosts());
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
});
