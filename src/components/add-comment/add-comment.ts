import { defineComponent } from 'vue';

export default defineComponent({
  name: 'addComment',
  emits: ['addComment'],
  data() {
    return {
      name: '',
      email: '',
      comment: ''
    };
  },
  methods: {
    addComment(): void {
      this.$emit('addComment', {
        name: this.name,
        email: this.email,
        body: this.comment
      });

      this.resetForm();
    },
    resetForm(): void {
      this.name = '';
      this.email = '';
      this.comment = '';
    }
  }
});
