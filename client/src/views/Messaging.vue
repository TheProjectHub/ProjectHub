<template>
  <div>
    <div>
      <div class="col">
        <h1>{{ this.conversationName }}</h1>
        <hr />
      </div>
      <div>
        <div class="messages" v-for="msg in this.messages" :key="msg">
          <p>
            <span class="font-weight-bold"
              >{{ msg.name }}: {{ msg.text }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div>
      <form @submit.prevent="sendMessage">
        <div>
          <label for="message">Message:</label>
          <input type="text" v-model="message" />
        </div>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
    </div>
  </div>
</template>
<script>
import io from 'socket.io-client';
import Conversation from '../services/Conversations';

export default {
  data() {
    return {
      message: '',
      messages: [],
      socket: io('localhost:3000'),
      conversationId: 0,
      conversationName: '',
    };
  },
  methods: {
    async setMessages(id) {
      const accessToken = await this.$auth.getTokenSilently();

      Conversation.get(id, accessToken).then((event) => {
        this.$set(this, 'messages', JSON.parse(event.data.messages));
        this.conversationName = event.data.name;
        this.conversationId = event.data.id;
      });
    },
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit('sendMessage', {
        message: {
          userId: this.$store.state.currentUser.id,
          text: this.message,
          timestamp: new Date(),
          name: `${this.$store.state.currentUser.first_name} ${this.$store.state.currentUser.last_name}`,
        },
        conversationId: this.conversationId,
      });
      this.message = '';
    },
    isMyMessage(msg) {
      return (
        msg.name === // eslint-disable-line
        `${this.$store.state.currentUser.first_name} ${this.$store.state.currentUser.last_name}`
      );
    },
  },
  mounted() {
    const checkIsAuthLoaded = setInterval(() => {
      if (!this.$auth.loading) {
        const conversations = JSON.parse(
          this.$store.state.currentUser.conversations,
        );
        this.setMessages(conversations[0]);

        this.socket.emit('initalConnection', conversations);
        this.socket.on('newMessage', (conversationId) => {
          // If the conversation that is currently being viewed was just updated
          if (this.conversationId === conversationId) {
            this.setMessages(conversationId);
          }
        });
        clearInterval(checkIsAuthLoaded);
      }
    }, 100);
  },
};
</script>
