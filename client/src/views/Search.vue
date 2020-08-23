<template>
  <v-app>
    <v-main class="gradient-background">
      <v-container fill-height>
        <v-container>
          <v-layout row justify-center>
            <v-flex xs8>
              <!-- search bar -->
              <v-card class="mx-auto" max-width="700" outlined>
                <v-toolbar dense flat class="mx-auto">
                  <v-app-bar-nav-icon></v-app-bar-nav-icon>
                  <v-text-field
                    hide-details
                    placeholder="search projects"
                    v-model="searchString"
                    single-line
                    clearable
                    @keydown.enter="getResults"
                    :loading="loading"
                  >
                  </v-text-field>

                  <v-chip
                    v-for="(t, i) in searchTags"
                    :key="i"
                    class="mr-2"
                    close
                    @click:close="removeTag(i)"
                  >
                    {{ t }}
                  </v-chip>

                  <v-btn icon @click="promptForTag">
                    <v-icon>add</v-icon>
                  </v-btn>

                  <v-btn icon @click="getResults">
                    <v-icon>search</v-icon>
                  </v-btn>
                </v-toolbar>
              </v-card>

              <!-- debug info -->
              <div>
                <!-- search string
                {{ searchString }}
                <br />
                search tags
                {{ searchTags }}
                <br />
                search results
                {{ searchResults }}
                <br />
                render list
                {{ projectsList }} -->
              </div>
            </v-flex>
          </v-layout>
        </v-container>

        <!-- research results -->
        <v-container fluid grid-list-xl v-if="searchResults.length > 0">
          <v-layout
            row
            justify-center
            v-for="(project, index) in projectsList"
            :key="index"
          >
            <v-flex xs8 md8>
              <v-card color="#385F73" dark>
                <v-card-title class="headline">
                  {{ project.name }}
                  <v-spacer />
                  <v-chip
                    outlined
                    v-for="(t, i) in project.tags"
                    class="blue-grey lighten-2 mr-2"
                    :key="i"
                    ><strong>{{ t }}</strong>
                  </v-chip>
                </v-card-title>
                <v-card-subtitle>
                  Members:
                  <span
                    v-for="(member, index) in project.members"
                    :key="member"
                  >
                    <b>
                      <span v-if="isUser(member)">Me</span>
                      <span v-else> {{ member }}</span>
                    </b>
                    <span v-if="index != project.members.length - 1">
                      |
                    </span>
                  </span>
                  <br />
                  {{ project.description }}
                  <br />
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn text @click="exploreProject(project.id)"
                    >EXPLORE</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {
  searchProjectByKeywordTags,
  searchProjectByKeyword,
  searchProjectByTags
} from "../services/Search";

import { onceAuthIsLoaded } from "../utilities/auth/auth.utility";
import { getProject } from "../services/Projects";
import { getUser } from "../services/Users";

export default {
  name: "Search",
  data() {
    return {
      searchString: "",
      searchTags: [],
      searchResults: [],
      projectsList: [],
      loading: false,
      accessToken: ""
    };
  },
  methods: {
    async getResults() {
      // don't do anything if search query is empty
      if (!this.searchString && !this.searchTags.length) {
        return;
      }

      this.loading = true;

      try {
        // get project ids matching search query
        this.searchResults = await this.makeQuery();

        // get projects corresponding to the IDs
        let projectListPromise = this.searchResults.map(
          this.getProjectInfoFromId
        );

        this.projectsList = await Promise.all(projectListPromise);

        // change route
        this.$router
          .replace({
            query: {
              keyword: this.searchString,
              tags: this.searchTags ? JSON.stringify(this.searchTags) : null
            }
          })
          .catch(() => {});

        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
    async makeQuery() {
      if (this.searchString && this.searchTags.length) {
        return (
          await searchProjectByKeywordTags(this.searchString, this.searchTags)
        ).data;
      } else if (this.searchString && !this.searchTags.length) {
        return (await searchProjectByKeyword(this.searchString)).data;
      } else if (!this.searchString && this.searchTags.length) {
        return (await searchProjectByTags(this.searchTags)).data;
      }
    },
    async getProjectInfoFromId(id) {
      const project = await getProject(id, this.accessToken);
      let userNames = [];
      let members = JSON.parse(project.data.members);

      members.forEach(async id => {
        const user = await getUser(id, this.accessToken);
        userNames.push(`${user.data.first_name} ${user.data.last_name}`);
      });

      let obj = {
        id: project.data.id,
        name: project.data.name,
        description: project.data.description,
        tags: JSON.parse(project.data.search_filters),
        members: userNames
      };
      return obj;
    },
    promptForTag() {
      let tag = prompt("Enter a tag:");
      this.searchTags.push(tag);
    },
    exploreProject(id) {
      this.$router.push(`/projects/${id}`);
    },
    removeTag(i) {
      this.searchTags.pop(i);
    },
    isUser(name) {
      return (
        name ==
        `${this.$store.state.currentUser.first_name} ${this.$store.state.currentUser.last_name}`
      );
    }
  },
  async mounted() {
    try {
      onceAuthIsLoaded(this.$auth, async () => {
        this.accessToken = await this.$auth.getTokenSilently();
        // read from url query strings if there are any
        let q = this.$route.query;
        if (q) {
          this.searchString = q.keyword ? q.keyword : this.searchString;
          this.searchTags = q.searchTags
            ? JSON.parse(this.$route.query.tags)
            : this.searchTags;
          this.getResults();
        }
      });
    } catch (err) {
      alert(`Error: ${err}`);
    }
  }
};
</script>

<style scoped>
#app {
  text-align: left;
}
</style>
