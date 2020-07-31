<template>
  <body>
    <div class="container">
      <div class="messaging">
        <div class="inbox-msg">
          <div class="conversations-inbox">
            <div class="conversations">
              <div
                v-for="name in this.conversationNames"
                v-bind:key="name"
              >
                <div class="chat-list active-chat conversation-preview">
                  <div class="chat-people">
                    <div class="chat-img">
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />
                    </div>
                    <div class="chat-ib">
                      <h5>{{ name }}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mesgs">
            <div class="msg-history">
              <div class="incoming-msg">
                <div class="incoming-msg-img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="received-msg">
                  <div class="received-withd-msg">
                    <p>Test, which is a new approach to have</p>
                    <span class="time-date"> 11:01 AM | Yesterday</span>
                  </div>
                </div>
              </div>
              <div class="outgoing-msg">
                <div class="sent-msg">
                  <p>Apollo University, Delhi, India Test</p>
                  <span class="time-date"> 11:01 AM | Today</span>
                </div>
              </div>
              <div class="outgoing-msg">
                <div class="sent-msg">
                  <p>Apollo University, Delhi, India Test</p>
                  <span class="time-date"> 11:01 AM | Today</span>
                </div>
              </div>
              <div class="outgoing-msg">
                <div class="sent-msg">
                  <p>Apollo University, Delhi, India Test</p>
                  <span class="time-date"> 11:01 AM | Today</span>
                </div>
              </div>
              <div class="outgoing-msg">
                <div class="sent-msg">
                  <p>Apollo University, Delhi, India Test</p>
                  <span class="time-date"> 11:01 AM | Today</span>
                </div>
              </div>
              <div class="outgoing-msg">
                <div class="sent-msg">
                  <p>Apollo University, Delhi, India Test</p>
                  <span class="time-date"> 11:01 AM | Today</span>
                </div>
              </div>
              <div class="outgoing-msg">
                <div class="sent-msg">
                  <p>Apollo University, Delhi, India Test</p>
                  <span class="time-date"> 11:01 AM | Today</span>
                </div>
              </div>
              <div class="outgoing-msg">
                <div class="sent-msg">
                  <p>Apollo University, Delhi, India Test</p>
                  <span class="time-date"> 11:01 AM | Today</span>
                </div>
              </div>
            </div>
            <div class="type-msg">
              <div class="input-msg-write">
                <input
                  type="text"
                  class="write-msg"
                  placeholder="Type a message"
                />
                <button class="msg-send-btn" type="button">
                  <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
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
      conversationNames: [],
      conversations: [],
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
    async setConversationNames() {
      const accessToken = await this.$auth.getTokenSilently();

      for (let i = 0; i < this.conversations.length; i += 1) {
        Conversation.get(this.conversations[i], accessToken).then((event) => // eslint-disable-line
          this.conversationNames.push(event.data.name), // eslint-disable-line
        ); // eslint-disable-line
      }
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
        this.conversations = JSON.parse(
          this.$store.state.currentUser.conversations,
        );
        this.setMessages(this.conversations[0]);
        this.setConversationNames();

        this.socket.emit('initalConnection', this.conversations);
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

<style scoped>
.container {
  max-width: 100vw;
  max-height: 100vh;
  margin: auto;
  padding-left: 50px;
  padding-right: 0vw;
}
img {
  max-width: 100%;
}
.conversations-inbox {
  background: #f8f8f8 none repeat scroll 1 1;
  float: left;
  overflow: hidden;
  width: 40%;
  border-right: 1px solid #c4c4c4;
}
.inbox-msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
  height: 100vh;
}
.top-spac {
  margin: 2vh 0 0;
}

.recent-heading {
  float: left;
  width: 40%;
}
.srch-bar {
  display: inline-block;
  text-align: right;
  padding-left: 40vh;
}
.heading-srch {
  padding: 1vh 2.9vh 1vh 2vh;
  overflow: hidden;
  border-bottom: 1px solid #c4c4c4;
}

.recent-heading h4 {
  color: #05728f;
  font-size: 2vh;
  margin: auto;
}
.srch-bar input {
  border: 1px solid #cdcdcd;
  border-width: 0 0 1px 0;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}
.srch-bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 1.8vh;
}
.srch-bar .input-group-addon {
  margin: 0 0 0 -2.7vh;
}

.chat-ib h5 {
  font-size: 1.5vh;
  color: #464646;
  margin: 0 0 .8vh 0;
}
.chat-ib h5 span {
  font-size: 1.3vh;
  float: right;
}
.chat-ib p {
  font-size: 1.4vh;
  color: #989898;
  margin: auto;
}
.chat-img {
  float: left;
  width: 11%;
}
.chat-ib {
  float: left;
  padding: 0 0 0 4vw;
  width: 88%;
}

.chat-people {
  overflow: hidden;
  clear: both;
  margin: auto;
}
.chat-list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding-top: 2.5vh;
  padding-left: 2.4vw;
}
.conversations {
  height: 85vh;
  /* overflow-y: scroll; */
}

.active-chat {
  background: #ebebeb;
}

.incoming-msg-img {
  display: inline-block;
  width: 6%;
}
.received-msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
}
.received-withd-msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time-date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received-withd-msg {
  width: 57%;
}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
  height: 80vh;
}

.sent-msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.outgoing-msg {
  overflow: hidden;
  margin: 26px 0 26px;
}
.sent-msg {
  float: right;
  width: 46%;
}
.input-msg-write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type-msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}
.msg-send-btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging {
  padding: 0 0 0 0;
}
.msg-history {
  height: 80vh;
  overflow-y: auto;
}
</style>
