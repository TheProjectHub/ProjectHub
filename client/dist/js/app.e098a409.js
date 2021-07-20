(function(t){function e(e){for(var a,r,o=e[0],c=e[1],l=e[2],h=0,m=[];h<o.length;h++)r=o[h],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&m.push(i[r][0]),i[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(m.length)m.shift()();return n.push.apply(n,l||[]),s()}function s(){for(var t,e=0;e<n.length;e++){for(var s=n[e],a=!0,o=1;o<s.length;o++){var c=s[o];0!==i[c]&&(a=!1)}a&&(n.splice(e--,1),t=r(r.s=s[0]))}return t}var a={},i={app:0},n=[];function r(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=a,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(s,a,function(e){return t[e]}.bind(null,a));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;n.push(["56d7","chunk-vendors"]),s()})({0:function(t,e){},"034f":function(t,e,s){"use strict";var a=s("85ec"),i=s.n(a);i.a},"04ec":function(t,e,s){"use strict";var a=s("98c2"),i=s.n(a);i.a},"242a":function(t,e,s){"use strict";var a=s("81b9"),i=s.n(a);i.a},"461c":function(t,e,s){},"492c":function(t,e,s){"use strict";var a=s("e80e"),i=s.n(a);i.a},"56d7":function(t,e,s){"use strict";s.r(e);var a=s("2b0e"),i=s("2f62"),n=s("4776"),r=s.n(n),o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("html",[s("div",{attrs:{id:"app"}},[s("link",{attrs:{rel:"stylesheet",href:"https://use.fontawesome.com/releases/v5.2.0/css/all.css",integrity:"sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ",crossorigin:"anonymous"}}),Object.values(this.$store.state.currentUser).length?s("sidebar-menu",{attrs:{menu:t.menu,collapsed:t.collapsed},on:{"toggle-collapse":this.onToggleCollapse,"item-click":t.onItemClick}}):t._e(),s("router-view"),s("div",{attrs:{id:"fade-to-black"}})],1)])},c=[],l=s("bc3a"),u=s.n(l),h=u.a.create({baseURL:""+Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_API_URL,headers:{"Content-type":"application/json"}});function m(t,e){return h.get("/users/"+t,{headers:{Authorization:"Bearer "+e}})}function d(t,e,s){return h.post("/users/invitetoconversation",{email:t,convId:e},{headers:{Authorization:"Bearer "+s}})}function p(t,e,s){return h.post("/users/addconversationtouser",{id:t,convId:e},{headers:{Authorization:"Bearer "+s}})}function v(t,e,s){return h.post("/users/rejectconversationrequest",{id:t,convId:e},{headers:{Authorization:"Bearer "+s}})}function f(t,e){return h.post("/users",t,{headers:{Authorization:"Bearer "+e}})}var g=s("aee4"),b={name:"App",components:{},data(){return{isNavBarOpen:!1,collapsed:!0,menu:[{header:!0,title:"Projectly",hiddenOnCollapse:!0},{href:"/profile",title:"Profile",icon:"fa fa-user"},{href:"/my-projects",title:"My Projects",icon:"fa fa-chart-area"},{href:"/search",title:"Search for Projects",icon:"fa fa-search"},{href:"/messaging",title:"Conversations",icon:"fa fa-comment"},{href:"/new-project",title:"Create New Project",icon:"fa fa-plus"},{title:"Logout",icon:"fa fa-user-times"}]}},methods:{onToggleCollapse(){this.isNavBarOpen=!this.isNavBarOpen,document.getElementById("fade-to-black").style.display=this.isNavBarOpen?"block":"none"},onItemClick(t,e){"Logout"===e.title&&this.$auth.logout()},async setCurrentUser(){const t=await this.$auth.getTokenSilently();m(this.$auth.user.email,t).then(t=>{t&&this.$store.commit("updateCurrentUser",t.data)})}},mounted(){Object(g["onceAuthIsLoaded"])(this.$auth,this.setCurrentUser),document.title="Projectly"}},y=b,_=(s("034f"),s("2877")),C=Object(_["a"])(y,o,c,!1,null,null,null),k=C.exports,w=s("8c4f"),j=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("html",[s("body",[s("div",{staticClass:"home"},[s("Splash")],1)])])},$=[],S=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("html",[t._m(0),t._m(1),s("div",{staticClass:"login-button text-center"},[t.$auth.loading?t._e():s("div",[t.$auth.isAuthenticated?t._e():s("button",{staticClass:"btn btn-light",on:{click:t.login}},[s("strong",[t._v("Get Started!")])]),t.$auth.isAuthenticated?s("button",{staticClass:"btn btn-light",on:{click:t.logout}},[s("strong",[t._v("Log out")])]):t._e()])]),t._m(2)])},N=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("head",[s("link",{attrs:{href:"https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&family=Lato&family=Patrick+Hand&display=swap",rel:"stylesheet"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"column"},[a("h1",[t._v(" Find Your Team with "),a("span",{staticStyle:{"background-color":"rgba(255, 255, 255, 0.5)",color:"transparent","border-radius":"25px","padding-bottom":"10px"}},[a("span",{staticClass:"gradient",staticStyle:{"font-family":"Comfortaa, cursive",padding:"10px"}},[t._v("Projectly")])])])]),a("div",{staticClass:"column"},[a("img",{staticStyle:{"margin-top":"-2vh"},attrs:{src:s("cf05")}})]),a("div",{staticClass:"intro"},[a("h2",{staticStyle:{"margin-bottom":"2vh"}},[t._v(" Here at Projectly, we want to help you change the world by providing you with a platform to find other like-minded indiviuals. Whether you want to disrupt the music industry, create new businesses, or even use your creativity to create the newest blockbuster we are here for you. Go change the world! ")]),a("h2",{staticStyle:{"font-size":"25px","margin-bottom":"2vh"}},[t._v(" -Your Friends at Projectly ")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("footer",[s("p",{staticStyle:{"padding-top":"2vh"}},[t._v("Copyright © 2020 Projectly")])])}],T={name:"Splash",methods:{login(){this.$auth.loginWithRedirect("/logincallback")},logout(){this.$auth.logout({returnTo:window.location.origin})}}},O=T,P=(s("ecba"),Object(_["a"])(O,S,N,!1,null,"79c03766",null)),x=P.exports,U={name:"Home",components:{Splash:x}},I=U,M=(s("cccb"),Object(_["a"])(I,j,$,!1,null,null,null)),E=M.exports,D=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("body",[s("div",{staticClass:"container"},[s("div",{staticClass:"messaging"},[s("div",{staticClass:"inbox-msg"},[s("div",{staticClass:"conversations-inbox"},[s("div",{staticClass:"conversations"},[t._l(t.conversations,(function(e){return s("div",{key:e.name},[t.conversationId==e.id?s("div",{staticClass:"chat-list active-chat conversation-preview",on:{click:function(s){return t.setMessages(e.id)}}},[s("div",{staticClass:"chat-people"},[s("div",{staticClass:"chat-ib"},[s("h5",[t._v(t._s(e.name))])])])]):s("div",{staticClass:"chat-list conversation-preview",on:{click:function(s){return t.setMessages(e.id)}}},[s("div",{staticClass:"chat-people"},[s("div",{staticClass:"chat-ib"},[s("h5",[t._v(t._s(e.name))])])])])])})),t._l(t.requestedConversations,(function(e){return s("div",{key:e.name},[s("div",{staticClass:"chat-list conversation-preview requested-conversation"},[s("div",{staticClass:"chat-people"},[s("div",{staticClass:"chat-ib"},[e.isDM?s("h5",[t._v(" You have been requested to start a DM with: "+t._s(e.name)+" ")]):s("h5",[t._v(' You have been requested to join: "'+t._s(e.name)+'"? ')])])]),s("i",{staticClass:"fas fa-check",staticStyle:{cursor:"pointer"},on:{click:function(s){return t.acceptInvitation(e.id)}}}),s("i",{staticClass:"fas fa-window-close",staticStyle:{"margin-left":"2vw",cursor:"pointer"},on:{click:function(s){return t.rejectInvitation(e.id)}}})])])}))],2),t.isCreatingNewConversation?t._e():s("button",{staticClass:"btn btn-primary",staticStyle:{"padding-bottom":"5vh",position:"absolute",bottom:"0px",width:"38vw","text-align":"center"},attrs:{type:"button"},on:{click:t.collectEmails}},[t._v(" Create new Conversation ")]),t.isCollectingEmails?s("form",{on:{submit:function(e){return e.preventDefault(),t.setName(e)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.invitees,expression:"invitees"}],staticClass:"form-control",staticStyle:{"padding-bottom":"2vh",position:"absolute",bottom:"0px",height:"12vh","font-size":"2vh",width:"38vw"},attrs:{placeholder:"Enter email(s)"},domProps:{value:t.invitees},on:{input:function(e){e.target.composing||(t.invitees=e.target.value)}}})]):t._e(),t.isSettingName?s("form",{on:{submit:function(e){return e.preventDefault(),t.createNewConversation(e)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newConversationName,expression:"newConversationName"}],staticClass:"form-control",staticStyle:{"padding-bottom":"2vh",position:"absolute",bottom:"0px",height:"12vh","font-size":"2vh",width:"38vw"},attrs:{placeholder:"Enter new conversation name"},domProps:{value:t.newConversationName},on:{input:function(e){e.target.composing||(t.newConversationName=e.target.value)}}})]):t._e()]),s("div",{staticClass:"mesgs"},[s("div",{staticClass:"msg-history custom-scrollbar",attrs:{id:"messages"}},t._l(this.messages,(function(e){return s("div",{key:e.timestamp,staticClass:"messages"},[t.isMyMessage(e)?t._e():s("p",{staticStyle:{"padding-left":"1.2vw","margin-bottom":"2px"}},[t._v(" "+t._s(e.name)+" ")]),t.isMyMessage(e)?s("div",{staticClass:"outgoing-msg"},[s("div",{staticClass:"sent-msg"},[s("p",[t._v(t._s(e.text))]),s("span",{staticClass:"time-date"},[t._v(" "+t._s(t.getDate(e.timestamp)))])])]):s("div",{staticClass:"incoming-msg"},[s("div",{staticClass:"received-msg"},[s("div",{staticClass:"received-withd-msg"},[s("p",[t._v(t._s(e.text))]),s("span",{staticClass:"time-date"},[t._v(" "+t._s(t.getDate(e.timestamp)))])])])])])})),0),s("div",{staticClass:"type-msg"},[s("div",{staticClass:"input-msg-write"},[s("form",{on:{submit:function(e){return e.preventDefault(),t.sendMessage(e)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],staticClass:"write-msg",attrs:{type:"text",placeholder:"Type a message"},domProps:{value:t.message},on:{input:function(e){e.target.composing||(t.message=e.target.value)}}}),s("button",{staticClass:"msg-send-btn",attrs:{type:"button"},on:{click:t.sendMessage}},[s("i",{staticClass:"fa fa-paper-plane",attrs:{"aria-hidden":"true"}})])])])])])])])])])},A=[],L=s("8055"),J=s.n(L);function B(t,e){return h.get("/conversations/"+t,{headers:{Authorization:"Bearer "+e}})}function F(t,e){return h.post("/conversations",t,{headers:{Authorization:"Bearer "+e}})}var R=s("f834"),q={data(){return{message:"",messages:[],socket:J()(""),conversationId:0,conversations:[],requestedConversations:[],isCreatingNewConversation:!1,isCollectingEmails:!1,invitees:"",isSettingName:!1,newConversationName:"",accessToken:""}},methods:{async updateDisplayedData(){const t=await m(this.$auth.user.email,this.accessToken);this.$store.commit("updateCurrentUser",t.data),await this.setConversations(),await this.setRequestedConversations()},async acceptInvitation(t){await p(this.$store.state.currentUser.id,t,this.accessToken),this.updateDisplayedData()},async rejectInvitation(t){await v(this.$store.state.currentUser.id,t,this.accessToken),this.updateDisplayedData()},collectEmails(){this.isCollectingEmails=!0},setName(){if(this.invitees){if(this.invitees.includes("@"))return 1==this.invitees.split(", ").length?(this.newConversationName="DM",void this.createNewConversation()):void(this.isSettingName=!0);alert("Please add a valid email(s)!")}else alert("You need to add at least one other user!")},async createNewConversation(){if(!this.newConversationName)return void alert("You need to set a name!");const t={users:JSON.stringify([this.$store.state.currentUser.id]),name:this.newConversationName},e=await F(t,this.accessToken);await p(this.$store.state.currentUser.id,e.data.id,this.accessToken),this.updateDisplayedData();const s=this.invitees.split(", ");s.forEach(t=>{d(t,e.data.id,this.accessToken)}),this.isCollectingEmails=!1,this.isCreatingNewConversation=!1,this.isSettingName=!1,this.invitees="",this.newConversationName=""},getDate(t){const e=new Date(t),s=new Date;if(e.getDate()===s.getDate()&&e.getDay()===s.getDay())return e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});if(e.getDate()===s.getDate()-1&&e.getDay()===s.getDay()-1)return"Yesterday | "+e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});const a=e.toLocaleDateString();return a.substring(0,a.lastIndexOf("/"))+" | "+e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})},scrollToBottom(){setTimeout(()=>{var t=document.getElementById("messages");t.scrollTop=t.scrollHeight},1)},async setMessages(t){const e=await B(t,this.accessToken);this.messages=JSON.parse(e.data.messages),this.conversationName=e.data.name,this.conversationId=e.data.id,this.scrollToBottom()},async setConversations(){this.conversations=[];const t=JSON.parse(this.$store.state.currentUser.conversations);t.forEach(t=>{B(t,this.accessToken).then(async t=>{const e=JSON.parse(t.data.users);if(e.length<2)return;let s=t.data.name;"DM"==s&&(s=await this.getDMName(e)),this.conversations.push({id:t.data.id,name:s})})})},async setRequestedConversations(){this.requestedConversations=[];const t=JSON.parse(this.$store.state.currentUser.requested_conversations);t.forEach(async t=>{const e=await B(t,this.accessToken);this.requestedConversations.push({id:t,name:"DM"==e.data.name?await this.getDMName(JSON.parse(e.data.users)):e.data.name,isDM:"DM"==e.data.name})})},sendMessage(t){this.message&&(t.preventDefault(),this.socket.emit("sendMessage",{message:{userId:this.$store.state.currentUser.id,text:this.message,timestamp:new Date,name:`${this.$store.state.currentUser.first_name} ${this.$store.state.currentUser.last_name}`},conversationId:this.conversationId}),this.message="",this.scrollToBottom())},isMyMessage(t){return this.isMe(t.name)},async getDMName(t){const e=await this.$auth.getTokenSilently();let s=t[0];t[0]==this.$store.state.currentUser.id&&(s=t[1]);const a=await m(s,e);return`${a.data.first_name} ${a.data.last_name}`},isMe(t){return t==`${this.$store.state.currentUser.first_name} ${this.$store.state.currentUser.last_name}`},initSocket(){this.socket.emit("initalConnection",JSON.parse(this.$store.state.currentUser.conversations)),this.socket.on("newMessage",t=>{this.conversationId===t&&this.setMessages(t)})}},mounted(){Object(g["onceAuthIsLoaded"])(this.$auth,async()=>{this.accessToken=await this.$auth.getTokenSilently(),Object(R["onceCurrentUserIsSet"])(this.$store,async()=>{await this.updateDisplayedData(),this.setMessages(JSON.parse(this.$store.state.currentUser.conversations)[0]),this.initSocket()})})}},z=q,W=(s("d391"),Object(_["a"])(z,D,A,!1,null,"7c027068",null)),Y=W.exports,H=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("html",[t._m(0),s("section",{staticClass:"main"},[s("form",[s("h1",{staticClass:"title is-1",staticStyle:{"font-family":"Comfortaa, cursive",padding:"10px"}},[t._v(" New Project ")]),s("div",{staticClass:"field"},[s("label",{staticClass:"label",staticStyle:{"font-family":"Comfortaa, cursive"}},[t._v("Project Name:")]),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.projectName,expression:"form.projectName"}],staticClass:"input",attrs:{type:"text",size:"40"},domProps:{value:t.form.projectName},on:{input:function(e){e.target.composing||t.$set(t.form,"projectName",e.target.value)}}})])]),s("div",{staticClass:"field"},[s("label",{staticClass:"label",staticStyle:{"font-family":"Comfortaa, cursive"}},[t._v("Description:")]),s("div",{staticClass:"control"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.form.description,expression:"form.description"}],attrs:{rows:"4",cols:"50"},domProps:{value:t.form.description},on:{input:function(e){e.target.composing||t.$set(t.form,"description",e.target.value)}}})])]),s("div",{staticClass:"field"},[s("label",{staticClass:"label",staticStyle:{"font-family":"Comfortaa, cursive"}},[t._v("Links:")]),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.links,expression:"form.links"}],staticClass:"input",attrs:{type:"text",size:"75"},domProps:{value:t.form.links},on:{input:function(e){e.target.composing||t.$set(t.form,"links",e.target.value)}}})])]),s("div",{staticClass:"field"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.lookingForNewMembers,expression:"form.lookingForNewMembers"}],attrs:{type:"checkbox",value:"true"},domProps:{checked:Array.isArray(t.form.lookingForNewMembers)?t._i(t.form.lookingForNewMembers,"true")>-1:t.form.lookingForNewMembers},on:{change:function(e){var s=t.form.lookingForNewMembers,a=e.target,i=!!a.checked;if(Array.isArray(s)){var n="true",r=t._i(s,n);a.checked?r<0&&t.$set(t.form,"lookingForNewMembers",s.concat([n])):r>-1&&t.$set(t.form,"lookingForNewMembers",s.slice(0,r).concat(s.slice(r+1)))}else t.$set(t.form,"lookingForNewMembers",i)}}}),t._v(" Looking for New Members? ")])]),s("input",{staticClass:"btn btn-primary margin-bottom",attrs:{type:"submit"},on:{click:[function(e){return e.preventDefault(),t.preventSubmit(e)},t.submitProject]}})])])])},Q=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("head",[s("link",{attrs:{href:"https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Comfortaa:wght@700&family=Lato&family=Patrick+Hand&display=swap",rel:"stylesheet"}})])}];function V(t,e){return h.get("/projects/"+t,{headers:{Authorization:"Bearer "+e}})}function G(t){return h.get("/projects",{headers:{Authorization:"Bearer "+t}})}function K(t,e){return h.post("/projects",t,{headers:{Authorization:"Bearer "+e}})}var X={name:"NewProject",data(){return{takenProjectNames:[],form:{projectName:"",description:"",links:"",lookingForNewMembers:["true"]},accessToken:""}},methods:{async getTakenProjectNames(){G(this.accessToken).then(t=>{const e=t.data;e.forEach(t=>{this.takenProjectNames.push(t.name)})})},isNameTaken(t){return this.takenProjectNames.includes(t)},async preventSubmit(){""===this.form.projectName&&(this.showSubmitFeedback=!0,setTimeout(()=>{this.showSubmitFeedback=!1},3e3))},async submitProject(){if(this.isNameTaken(this.form.projectName)&&this.form.name)alert(`The name: ${this.form.projectName} is taken!`);else{const t={members:JSON.stringify([this.$store.state.currentUser.id]),name:this.form.projectName,links:JSON.stringify(this.form.links.split(", ")),description:this.form.description,looking_for_new_members:this.form.lookingForNewMembers.length,search_filters:"[]",applicants:"[]"};K(t,this.accessToken).then(()=>{this.$router.push("/")})}}},mounted(){Object(g["onceAuthIsLoaded"])(this.$auth,async()=>{this.accessToken=await this.$auth.getTokenSilently(),Object(R["onceCurrentUserIsSet"])(this.$store,this.getTakenProjectNames)})}},Z=X,tt=(s("7460"),Object(_["a"])(Z,H,Q,!1,null,"8f700bc6",null)),et=tt.exports,st=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("html",[s("head"),s("body",[s("div",{staticClass:"profile"},[s("div",{staticClass:"toprow"},[t._m(0),s("div",{staticClass:"user"},[s("div",{staticClass:"name"},[s("h2",[t._v(" "+t._s(this.$store.state.currentUser.first_name)+" "+t._s(this.$store.state.currentUser.last_name)+" ")]),this.$store.state.currentUser.looking_for_project?t._e():s("h3",[t._v(" is looking for a project! ")])]),s("p",[s("strong",[t._v(t._s(this.$store.state.currentUser.age)+" yrs old")])]),s("p",[s("i",{staticClass:"fa fa-map-marker",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(this.$store.state.currentUser.location)+" ")]),t._m(1),s("p",[t._v(t._s(this.$store.state.currentUser.bio))])])]),s("div",{staticClass:"bottomrow"},[s("div",{staticClass:"skills"},[s("h3",[t._v("I have skills in:")]),t._l(t.userSkills,(function(e,a){return s("ul",{key:a,staticStyle:{"list-style":"none"}},[t._v(" "+t._s(e)+" ")])}))],2),s("div",{staticClass:"projects"},[s("h3",[t._v("I am affiliated with these projects:")]),t._l(t.projects,(function(e,a){return s("ul",{key:a,staticStyle:{"list-style":"none"}},[t._v(" "+t._s(e.name)+" ")])}))],2)])])])])},at=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"PP"},[a("img",{attrs:{alt:"Vue logo",src:s("cf05")}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a",{staticClass:"msg-btn",attrs:{href:"/conversations",type:"button"}},[s("i",{staticClass:"fa fa-envelope-o",attrs:{"aria-hidden":"true"}}),t._v("Send Message ")])}],it={name:"Profile",data(){return{projects:[],userSkills:[],accessToken:""}},methods:{async setProjects(){this.userSkills=JSON.parse(this.$store.state.currentUser.skills);const t=JSON.parse(this.$store.state.currentUser.project_affiliation);t.forEach(t=>{V(t,this.accessToken).then(t=>{this.projects.push(t.data)})})}},mounted(){Object(g["onceAuthIsLoaded"])(this.$auth,async()=>{this.accessToken=await this.$auth.getTokenSilently(),Object(R["onceCurrentUserIsSet"])(this.$store,this.setProjects)})}},nt=it,rt=(s("c69c"),Object(_["a"])(nt,st,at,!1,null,"a5be9226",null)),ot=rt.exports,ct=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("html",[s("section",{staticClass:"main",attrs:{id:"new"}},[s("form",[s("h1",{staticClass:"title is-1"},[t._v(" Tell us about yourself! ")]),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("First Name:")]),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.first_name,expression:"first_name"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.first_name},on:{input:function(e){e.target.composing||(t.first_name=e.target.value)}}})])]),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Last Name:")]),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.last_name,expression:"last_name"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.last_name},on:{input:function(e){e.target.composing||(t.last_name=e.target.value)}}})])]),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Email:")]),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"input",attrs:{type:"text",disabled:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})])]),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Bio:")]),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.bio,expression:"bio"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.bio},on:{input:function(e){e.target.composing||(t.bio=e.target.value)}}})])]),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Age:")]),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.age,expression:"age"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.age},on:{input:function(e){e.target.composing||(t.age=e.target.value)}}})])]),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Location:")]),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.location,expression:"location"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.location},on:{input:function(e){e.target.composing||(t.location=e.target.value)}}})])]),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Skills:")]),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.skill,expression:"skill"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.skill},on:{input:function(e){e.target.composing||(t.skill=e.target.value)}}})]),s("button",{staticClass:"btn btn-info",attrs:{type:"button"},on:{click:t.addSkill}},[t._v(" Add skill ")]),t._l(t.skills,(function(e,a){return s("div",{key:a},[t._v(t._s(e))])}))],2),s("input",{staticClass:"button is-primary margin-bottom: 2vh;",attrs:{type:"submit"},on:{click:t.createUser}})])])])},lt=[],ut={name:"Signup",data(){return{first_name:this.$auth.user.given_name,last_name:this.$auth.user.family_name,email:this.$auth.user.email,skill:"",skills:[],bio:"",age:"",location:""}},methods:{async createUser(){const t=await this.$auth.getTokenSilently(),e={first_name:this.first_name,last_name:this.last_name,project_affiliation:"[]",email:this.email,search_filters:"[]",looking_for_project:1,skills:JSON.stringify(this.skills),bio:this.bio,conversations:"[]",unread_conversations:"[]",requested_conversations:"[]",age:this.age,location:this.location};await f(e,t),this.$router.push("/")},addSkill(){this.skills.push(this.skill),this.skill=""},displayUserOAuthData(){this.first_name=this.$auth.user.given_name,this.last_name=this.$auth.user.family_name,this.email=this.$auth.user.email}},mounted(){Object(g["onceAuthIsLoaded"])(this.$auth,this.displayUserOAuthData)}},ht=ut,mt=(s("f5bb"),Object(_["a"])(ht,ct,lt,!1,null,"07c86f96",null)),dt=mt.exports,pt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"callback"})},vt=[],ft={name:"LoginCallback",methods:{async checkIfUserExists(){const t=await this.$auth.getTokenSilently();try{const e=await m(this.$auth.user.email,t);e.data.email&&this.$router.push("/")}catch(e){this.$router.push("/signup")}}},mounted(){Object(g["onceAuthIsLoaded"])(this.$auth,this.checkIfUserExists)}},gt=ft,bt=(s("242a"),Object(_["a"])(gt,pt,vt,!1,null,"4204ff66",null)),yt=bt.exports,_t=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("html",[s("div",{staticClass:"main"},[s("div",{staticClass:"row",staticStyle:{"padding-top":"20px"}},[s("div",{staticClass:"col text-info1"},[s("h1",[t._v(t._s(this.project.name))]),this.project.looking_for_new_members?s("p",[t._v(" is looking for applicants! ")]):t._e(),s("div",{staticClass:"row"},t._l(this.projectTags,(function(e,a){return s("p",{key:a,staticClass:"tag-label"},[t._v(" "+t._s(e)+" ")])})),0),s("div",{staticClass:"row"},[s("p",[t._v("Description: "+t._s(this.project.description))])]),s("div",[s("p",[t._v("Applicants:")]),t._l(this.projectApplicants,(function(e,a){return s("p",{key:a},[t._v(" "+t._s(e.user.first_name)+" "+t._s(e.user.last_name)+" "),s("br"),t._v(" Votes: "+t._s(e.appObj.votes)+" "),s("br")])}))],2)]),s("div",{staticClass:"col"},[s("div",[s("p",[t._v("Members:")]),t._l(t.projectMembers,(function(e,a){return s("p",{key:a},[t._v(" "+t._s(e.first_name)+" "+t._s(e.last_name)+" "),s("br")])}))],2),s("br"),s("div",[s("p",[t._v("Links:")]),t._l(this.projectLinks,(function(e,a){return s("a",{key:a,attrs:{href:t.goodLink(e)}},[t._v(" "+t._s(e)+" "),s("br")])}))],2)])])])])},Ct=[],kt={name:"Project",data(){return{projectId:this.$route.params.projectId,project:{},projectMembers:[],projectTags:[],projectLinks:[],projectApplicants:[],accessToken:""}},methods:{async getProject(t){const e=await V(t,this.accessToken);this.project=e.data,JSON.parse(this.project.members).forEach(async t=>{const e=await m(t,this.accessToken);this.projectMembers.push(e.data)}),this.projectTags=JSON.parse(this.project.search_filters),this.projectLinks=JSON.parse(this.project.links),JSON.parse(this.project.applicants).forEach(async t=>{const e=await m(t["user-id"],this.accessToken);this.projectApplicants.push({user:e.data,appObj:t})})},goodLink(t){return t.startsWith("http://")||t.startsWith("https://")?t:"http://"+t}},mounted(){Object(g["onceAuthIsLoaded"])(this.$auth,async()=>{this.accessToken=await this.$auth.getTokenSilently(),Object(R["onceCurrentUserIsSet"])(this.$store,()=>{this.getProject(this.projectId)})})}},wt=kt,jt=(s("04ec"),Object(_["a"])(wt,_t,Ct,!1,null,"2ba40e71",null)),$t=jt.exports,St=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("html",[s("div",{staticClass:"row container"},[s("div",{staticClass:"col-xs-12 project-entries"},[s("h1",[t._v(t._s(this.$store.state.currentUser.first_name)+"'s Projects")]),t._l(t.projects,(function(e){return s("div",{key:e.name,staticClass:"project-entry",on:{click:function(s){return t.navigateToProject(e.id)}}},[s("h3",[t._v(t._s(e.name))]),s("span",[t._v("Members: ")]),t._l(e.members,(function(a,i){return s("span",{key:a},[t.isUser(a)?s("span",[t._v("Me")]):s("span",[t._v(" "+t._s(a))]),i!=e.members.length-1?s("span",[t._v(" | ")]):t._e()])}))],2)}))],2)])])},Nt=[],Tt={name:"MyProjects",data(){return{projects:[],accessToken:""}},methods:{async setProjects(){const t=JSON.parse(this.$store.state.currentUser.project_affiliation);t.forEach(async t=>{const e=await V(t,this.accessToken);let s=[],a=JSON.parse(e.data.members);a.forEach(async t=>{const e=await m(t,this.accessToken);s.push(`${e.data.first_name} ${e.data.last_name}`)}),this.projects.push({id:e.data.id,name:e.data.name,members:s})})},navigateToProject(t){this.$router.push("/projects/"+t)},isUser(t){return t==`${this.$store.state.currentUser.first_name} ${this.$store.state.currentUser.last_name}`}},mounted(){Object(g["onceAuthIsLoaded"])(this.$auth,async()=>{this.accessToken=await this.$auth.getTokenSilently(),Object(R["onceCurrentUserIsSet"])(this.$store,async()=>{this.setProjects()})})}},Ot=Tt,Pt=(s("492c"),Object(_["a"])(Ot,St,Nt,!1,null,"256815d6",null)),xt=Pt.exports,Ut=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("html")},It=[];function Mt(t,e,s=10){let a={keyword:t,tags:e,limit:s};return h.get("/search/searchProjectByKeywordTags",{params:a})}function Et(t,e=10){let s={keyword:t,limit:e};return h.get("/search/searchProjectByKeyword",{params:s})}function Dt(t,e=10){let s={tags:t,limit:e};return h.get("/search/searchProjectByTags",{params:s})}var At={name:"Search",data(){return{searchString:"",searchTags:[],searchResults:[],projectsList:[],loading:!1,accessToken:""}},methods:{async getResults(){if(this.searchString||this.searchTags.length){this.loading=!0;try{this.searchResults=await this.makeQuery();let t=this.searchResults.map(this.getProjectInfoFromId);this.projectsList=await Promise.all(t),this.$router.replace({query:{keyword:this.searchString,tags:this.searchTags?JSON.stringify(this.searchTags):null}}).catch(()=>{}),this.loading=!1}catch(t){this.loading=!1,console.log(t)}}},async makeQuery(){return this.searchString&&this.searchTags.length?(await Mt(this.searchString,this.searchTags)).data:this.searchString&&!this.searchTags.length?(await Et(this.searchString)).data:!this.searchString&&this.searchTags.length?(await Dt(this.searchTags)).data:void 0},async getProjectInfoFromId(t){const e=await V(t,this.accessToken);let s=[],a=JSON.parse(e.data.members);a.forEach(async t=>{const e=await m(t,this.accessToken);s.push(`${e.data.first_name} ${e.data.last_name}`)});let i={id:e.data.id,name:e.data.name,description:e.data.description,tags:JSON.parse(e.data.search_filters),members:s};return i},promptForTag(){let t=prompt("Enter a tag:");this.searchTags.push(t)},exploreProject(t){this.$router.push("/projects/"+t)},removeTag(t){this.searchTags.pop(t)},isUser(t){return t==`${this.$store.state.currentUser.first_name} ${this.$store.state.currentUser.last_name}`}},async mounted(){try{Object(g["onceAuthIsLoaded"])(this.$auth,async()=>{this.accessToken=await this.$auth.getTokenSilently();let t=this.$route.query;t&&(this.searchString=t.keyword?t.keyword:this.searchString,this.searchTags=t.searchTags?JSON.parse(this.$route.query.tags):this.searchTags,this.getResults())})}catch(t){alert("Error: "+t)}}},Lt=At,Jt=(s("eeeb"),Object(_["a"])(Lt,Ut,It,!1,null,"2a246510",null)),Bt=Jt.exports,Ft=s("9767");const Rt=()=>{window.history.replaceState({},document.title,window.location.pathname)};let qt;const zt=()=>qt,Wt=({onRedirectCallback:t=Rt,redirectUri:e=window.location.origin,...s})=>qt||(qt=new a["a"]({data(){return{loading:!0,isAuthenticated:!1,user:{},auth0Client:null,popupOpen:!1,error:null}},methods:{async loginWithPopup(t){this.popupOpen=!0;try{await this.auth0Client.loginWithPopup(t)}catch(e){console.error(e)}finally{this.popupOpen=!1}this.user=await this.auth0Client.getUser(),this.isAuthenticated=!0},async handleRedirectCallback(){this.loading=!0;try{await this.auth0Client.handleRedirectCallback(),this.user=await this.auth0Client.getUser(),this.isAuthenticated=!0}catch(t){this.error=t}finally{this.loading=!1}},loginWithRedirect(t){return this.auth0Client.loginWithRedirect(t)},getIdTokenClaims(t){return this.auth0Client.getIdTokenClaims(t)},getTokenSilently(t){return this.auth0Client.getTokenSilently(t)},getTokenWithPopup(t){return this.auth0Client.getTokenWithPopup(t)},logout(t){return this.auth0Client.logout(t)}},async created(){this.auth0Client=await Object(Ft["a"])({domain:s.domain,client_id:s.clientId,audience:s.audience,redirect_uri:e});try{if(window.location.search.includes("code=")&&window.location.search.includes("state=")){const{appState:e}=await this.auth0Client.handleRedirectCallback();t(e)}}catch(a){this.error=a}finally{this.isAuthenticated=await this.auth0Client.isAuthenticated(),this.user=await this.auth0Client.getUser(),this.loading=!1}}}),qt),Yt={install(t,e){t.prototype.$auth=Wt(e)}},Ht=(t,e,s)=>{const a=zt(),i=()=>{if(a.isAuthenticated)return s();a.loginWithRedirect({appState:{targetUrl:t.fullPath}})};if(!a.loading)return i();a.$watch("loading",t=>{if(!1===t)return i()})};a["a"].use(w["a"]);const Qt=[{path:"/",name:"Home",component:E},{path:"/logincallback",name:"LoginCallback",component:yt},{path:"/messaging",name:"Messaging",component:Y,beforeEnter:Ht},{path:"/new-project",name:"NewProject",component:et,beforeEnter:Ht},{path:"/profile",name:"Profile",component:ot,beforeEnter:Ht},{path:"/projects/:projectId",name:"Project",component:$t,beforeEnter:Ht},{path:"/signup",name:"Signup",component:dt,beforeEnter:(t,e,s)=>{"LoginCallback"!=e.name?s({name:"Home"}):(console.log(e.name),s())}},{path:"/search",name:"Search",component:Bt},{path:"/my-projects",name:"MyProjects",component:xt,beforeEnter:Ht}],Vt=new w["a"]({mode:"history",base:"/",routes:Qt});var Gt=Vt,Kt=(s("b15b"),s("4989"),s("ab8b"),s("8160"));s("d1e7");a["a"].use(r.a),a["a"].use(Yt,{domain:Kt["c"],clientId:Kt["b"],audience:Kt["a"],onRedirectCallback:t=>{Gt.push(t&&t.targetUrl?t.targetUrl:window.location.pathname)},redirectUri:"/logincallback"}),a["a"].config.productionTip=!1,a["a"].use(i["a"]);const Xt=new i["a"].Store({state:{currentUser:{}},mutations:{updateCurrentUser(t,e){t.currentUser=e}}});new a["a"]({router:Gt,render:t=>t(k),store:Xt}).$mount("#app")},"5ced":function(t,e,s){},6770:function(t,e,s){},"6eaf":function(t,e,s){},7460:function(t,e,s){"use strict";var a=s("461c"),i=s.n(a);i.a},"7d6a":function(t,e,s){},8160:function(t){t.exports=JSON.parse('{"c":"projecthub.us.auth0.com","b":"r7421O3V3YmiSXhoS6UFS273URrQyQ8Q","a":"https://projectly.com"}')},"81b9":function(t,e,s){},"85ec":function(t,e,s){},"98c2":function(t,e,s){},"9b86":function(t,e,s){},"9c0a":function(t,e,s){},aee4:function(t,e){e.onceAuthIsLoaded=function(t,e){const s=setInterval(()=>{t.loading||(e(),clearInterval(s))},10)}},c69c:function(t,e,s){"use strict";var a=s("6eaf"),i=s.n(a);i.a},cccb:function(t,e,s){"use strict";var a=s("5ced"),i=s.n(a);i.a},cf05:function(t,e,s){t.exports=s.p+"img/logo.4e2eca1a.png"},d391:function(t,e,s){"use strict";var a=s("9b86"),i=s.n(a);i.a},e80e:function(t,e,s){},ecba:function(t,e,s){"use strict";var a=s("6770"),i=s.n(a);i.a},eeeb:function(t,e,s){"use strict";var a=s("9c0a"),i=s.n(a);i.a},f5bb:function(t,e,s){"use strict";var a=s("7d6a"),i=s.n(a);i.a},f834:function(t,e){e.onceCurrentUserIsSet=function(t,e){const s=setInterval(()=>{Object.keys(t.state.currentUser).length&&(e(),clearInterval(s))},10)}}});
//# sourceMappingURL=app.e098a409.js.map