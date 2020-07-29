<template>
  <div>
    <div>
      <div>
        <h3>Chat Group</h3>
        <hr />
      </div>
      <div>
        <div class="messages" v-for="(msg, index) in messages" :key="index">
          <p>
            <span class="font-weight-bold">{{ msg.user }}: </span
            >{{ msg.message }}
          </p>
        </div>
      </div>
    </div>
    <div>
      <form @submit.prevent="sendMessage">
        <div>
          <label for="user">User:</label>
          <input type="text" v-model="user" />
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

export default {
  data() {
    return {
      user: '',
      message: '',
      messages: [],
      socket: io('localhost:3000'),
    };
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message,
      });
      this.message = '';
    },
  },
  mounted() {
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
  },
};
</script>
