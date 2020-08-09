<template>
  <body>
    <div class="container">
      <div class="messaging">
        <div class="inbox-msg">
          <div class="conversations-inbox">
            <div class="conversations">
              <div v-for="conv in conversations" v-bind:key="conv.name">
                <div
                  v-if="conversationId == conv.id"
                  class="chat-list active-chat conversation-preview"
                  @click="setMessages(conv.id)"
                >
                  <div class="chat-people">
                    <div class="chat-ib">
                      <h5>{{ conv.name }}</h5>
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  class="chat-list conversation-preview"
                  @click="setMessages(conv.id)"
                >
                  <div class="chat-people">
                    <div class="chat-ib">
                      <h5>{{ conv.name }}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div v-for="conv in requestedConversations" :key="conv.name">
                <div
                  class="chat-list conversation-preview requested-conversation"
                >
                  <div class="chat-people">
                    <div class="chat-ib">
                      <h5>
                        You have been requested to join: "{{ conv.name }}"?
                      </h5>
                    </div>
                  </div>
                  <i
                    class="fas fa-check"
                    style="cursor: pointer;"
                    @click="acceptInvitation(conv.id)"
                  ></i>
                  <i
                    class="fas fa-window-close"
                    style="margin-left: 2vw; cursor: pointer;"
                    @click="rejectInvitation(conv.id)"
                  ></i>
                </div>
              </div>
            </div>
            <button
              v-if="!isCreatingNewConversation"
              @click="collectEmails"
              type="button"
              class="btn btn-primary"
              style="padding-bottom: 5vh;
                position: absolute; bottom: 0px;
                width: 38vw; text-align: center;"
            >
              Create new Conversation
            </button>
            <form @submit.prevent="setName" v-if="isCollectingEmails">
              <input
                class="form-control"
                placeholder="Enter email(s)"
                style="padding-bottom: 2vh;
                  position: absolute; bottom: 0px;
                  height: 12vh; font-size: 2vh; width: 38vw;"
                v-model="invitees"
              />
            </form>
            <form @submit.prevent="createNewConversation" v-if="isSettingName">
              <input
                class="form-control"
                placeholder="Enter new conversation name"
                style="padding-bottom: 2vh;
                  position: absolute; bottom: 0px;
                  height: 12vh; font-size: 2vh; width: 38vw;"
                v-model="newConversationName"
              />
            </form>
          </div>
          <div class="mesgs">
            <div class="msg-history custom-scrollbar" id="messages">
              <div
                class="messages"
                v-for="msg in this.messages"
                v-bind:key="msg.timestamp"
              >
                <p
                  v-if="!isMyMessage(msg)"
                  style="padding-left: 1.2vw; margin-bottom: 2px;"
                >
                  {{ msg.name }}
                </p>
                <div class="incoming-msg" v-if="!isMyMessage(msg)">
                  <div class="received-msg">
                    <div class="received-withd-msg">
                      <p>{{ msg.text }}</p>
                      <span class="time-date">
                        {{ getDate(msg.timestamp) }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="outgoing-msg" v-else>
                  <div class="sent-msg">
                    <p>{{ msg.text }}</p>
                    <span class="time-date"> {{ getDate(msg.timestamp) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="type-msg">
              <div class="input-msg-write">
                <form @submit.prevent="sendMessage">
                  <input
                    type="text"
                    v-model="message"
                    class="write-msg"
                    placeholder="Type a message"
                  />
                  <button
                    class="msg-send-btn"
                    type="button"
                    @click="sendMessage"
                  >
                    <i class="fa fa-paper-plane" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import io from "socket.io-client";

import { createConversation, getConversation } from "../services/Conversations";
import {
  getUser,
  addConversationToUser,
  rejectConversationRequest,
  inviteUserToConversation
} from "../services/Users";

import { onceAuthIsLoaded } from "../utilities/auth/auth.utility";
import { onceCurrentUserIsSet } from "../utilities/vuex/vuex.utility";

export default {
  data() {
    return {
      message: "",
      messages: [],
      socket: io("localhost:3000"),
      conversationId: 0,
      conversations: [],
      requestedConversations: [],
      isCreatingNewConversation: false,
      isCollectingEmails: false,
      invitees: "",
      isSettingName: false,
      newConversationName: "",
      accessToken: ""
    };
  },
  methods: {
    async updateDisplayedData() {
      const user = await getUser(this.$auth.user.email, this.accessToken);
      this.$store.commit("updateCurrentUser", user.data);
      await this.setConversations();
      await this.setRequestedConversations();
    },
    async acceptInvitation(convId) {
      await addConversationToUser(
        this.$store.state.currentUser.id,
        convId,
        this.accessToken
      );
      this.updateDisplayedData();
    },
    async rejectInvitation(id) {
      await rejectConversationRequest(
        this.$store.state.currentUser.id,
        id,
        this.accessToken
      );
      this.updateDisplayedData();
    },
    collectEmails() {
      this.isCollectingEmails = true;
    },
    setName() {
      if (!this.invitees) {
        alert("You need to add at least one other user!");
        return;
      }
      if (!this.invitees.includes("@")) {
        alert("Please add a valid email(s)!");
        return;
      }
      this.isSettingName = true;
    },
    async createNewConversation() {
      if (!this.newConversationName) {
        alert("You need to set a name!");
        return;
      }

      const newConversation = {
        users: JSON.stringify([this.$store.state.currentUser.id]),
        name: this.newConversationName
      };

      const response = await createConversation(
        newConversation,
        this.accessToken
      );

      await addConversationToUser(
        this.$store.state.currentUser.id,
        response.data.id,
        this.accessToken
      );

      this.updateDisplayedData();

      const emails = this.invitees.split(", ");
      emails.forEach(email => {
        inviteUserToConversation(email, response.data.id, this.accessToken);
      });

      this.isCollectingEmails = false;
      this.isCreatingNewConversation = false;
      this.isSettingName = false;
    },
    getDate(date) {
      const time = new Date(date);
      const now = new Date();

      // Message sent today -> return just time
      if (time.getDate() === now.getDate() && time.getDay() === now.getDay()) {
        return time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        });
      }

      // Message sent yesterday -> return Yesterday | time
      if (
        time.getDate() === now.getDate() - 1 &&
        time.getDay() === now.getDay() - 1
      ) {
        return (
          "Yesterday | " +
          time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      }

      // return MM/DD | time
      const dateWithYear = time.toLocaleDateString();

      return (
        dateWithYear.substring(0, dateWithYear.lastIndexOf("/")) +
        " | " +
        time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    },
    scrollToBottom() {
      setTimeout(() => {
        var messagesList = document.getElementById("messages");
        messagesList.scrollTop = messagesList.scrollHeight;
      }, 1);
    },
    async setMessages(convId) {
      const conversation = await getConversation(convId, this.accessToken);
      this.messages = JSON.parse(conversation.data.messages);
      this.conversationName = conversation.data.name;
      this.conversationId = conversation.data.id;
      this.scrollToBottom();
    },
    async setConversations() {
      this.conversations = [];
      const convoIds = JSON.parse(this.$store.state.currentUser.conversations);

      convoIds.forEach(async id => {
        const conversation = await getConversation(id, this.accessToken);
        this.conversations.push({
          id: conversation.data.id,
          name: conversation.data.name
        });
      });
    },
    async setRequestedConversations() {
      this.requestedConversations = [];
      const reqConvoIds = JSON.parse(
        this.$store.state.currentUser.requested_conversations
      );

      reqConvoIds.forEach(async id => {
        const conversation = await getConversation(id, this.accessToken);
        this.requestedConversations.push({
          id: id,
          name: conversation.data.name
        });
      });
    },
    sendMessage(e) {
      if (!this.message) return;
      e.preventDefault();

      this.socket.emit("sendMessage", {
        message: {
          userId: this.$store.state.currentUser.id,
          text: this.message,
          timestamp: new Date(),
          name: `${this.$store.state.currentUser.first_name} ${this.$store.state.currentUser.last_name}`
        },
        conversationId: this.conversationId
      });
      this.message = "";
      this.scrollToBottom();
    },
    isMyMessage(msg) {
      return (
        msg.name ===
        `${this.$store.state.currentUser.first_name} ${this.$store.state.currentUser.last_name}`
      );
    },
    initSocket() {
      this.socket.emit(
        "initalConnection",
        JSON.parse(this.$store.state.currentUser.conversations)
      );

      this.socket.on("newMessage", conversationId => {
        // If the conversation that is currently being viewed was just updated
        if (this.conversationId === conversationId) {
          this.setMessages(conversationId);
        }
      });
    }
  },
  mounted() {
    onceAuthIsLoaded(this.$auth, async () => {
      this.accessToken = await this.$auth.getTokenSilently();

      onceCurrentUserIsSet(this.$store, async () => {
        await this.updateDisplayedData();
        this.setMessages(
          JSON.parse(this.$store.state.currentUser.conversations)[0]
        );
        this.initSocket();
      });
    });
  }
};
</script>

<style scoped>
.container {
  background-color: white;
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
  font-size: 3vh;
  color: #464646;
}
.chat-ib h5 span {
  font-size: 2vh;
  float: right;
}
.chat-ib p {
  font-size: 1.4vh;
  color: #989898;
  margin: auto;
}
.chat-ib {
  float: left;
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
  padding-top: 1.6vh;
  padding-left: 2.4vw;
}
.chat-list:hover {
  background: #f3f3f3;
}
.requested-conversation:hover {
  background: white;
}
.conversations {
  height: 89vh;
  position: relative;
  overflow-y: scroll;
}

.active-chat {
  background: #ebebeb;
}

.active-chat:hover {
  background: #ebebeb;
}

.incoming-msg-img {
  display: inline-block;
  height: 7vh;
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
  margin: 0;
  padding: 5px 10px 5px 1vw;
  width: 100%;
}
.time-date {
  color: #747474;
  display: block;
  font-size: 2vh;
  margin: 4px 0 0 4px;
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
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.outgoing-msg {
  overflow: hidden;
}
.sent-msg {
  float: right;
  width: 46%;
}
.input-msg-write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 2.5vh;
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
  height: 84vh;
  overflow-y: auto;
}

.messages {
  font-size: 2.5vh;
  padding-bottom: 1vh;
  padding-right: 1vw;
}

.custom-scrollbar::-webkit-scrollbar-track {
  /* visibility: hidden; */
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

.custom-scrollbar::-webkit-scrollbar {
  /* visibility: hidden; */
  width: 12px;
  background-color: #f5f5f5;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  /* visibility: hidden; */
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
</style>
