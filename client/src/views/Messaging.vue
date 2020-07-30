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
            <span class="font-weight-bold">{{ msg.text }} </span>
          </p>
        </div>
      </div>
    </div>
    <div>
      <form @submit.prevent="sendMessage">
        <div>
          <label for="conversationId">Conversation ID:</label>
          <input type="text" v-model="conversationId" />
        </div>
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
      conversationId: 1,
      conversationName: '',
    };
  },
  methods: {
    async setMessages(id) {
      // Get the access token from the auth wrapper
      const accessToken = await this.$auth.getTokenSilently();

      Conversation.get(id, accessToken).then((event) => {
        this.$set(this, 'messages', JSON.parse(event.data.messages));
        this.conversationName = event.data.name;
      });
    },
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit('SEND_MESSAGE', {
        message: {
          userId: 1,
          text: this.message,
          timestamp: new Date(),
        },
        conversationId: this.conversationId,
      });
      this.message = '';
    },
  },
  mounted() {
    this.setMessages(1);
    this.socket.on('broadcast', (conversationId) => {
      if (this.conversationId === conversationId) {
        this.setMessages(conversationId);
      }
    });
  },
};
</script>
