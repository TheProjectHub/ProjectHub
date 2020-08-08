<template>
  <v-app>
    <v-main class="gradient-background">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md5>
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
                ></v-text-field>

                <v-btn icon @click="getResults">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-toolbar>
            </v-card>

            search string
            {{ searchString }}
            <br />
            search tags
            {{ searchTags }}
            <br />
            search results
            {{ this.searchResults }}
          </v-flex>
        </v-layout>
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

export default {
  name: "Search",
  data() {
    return {
      searchString: "",
      searchTags: [],
      searchResults: [],
      loading: false
    };
  },
  methods: {
    async getResults() {
      if (!this.searchString && !this.searchTags) {
        return;
      }

      this.loading = true;

      try {
        if (this.searchString && this.tags) {
          this.searchResults = (
            await searchProjectByKeywordTags(this.searchString, this.tags)
          ).data;
        } else if (this.searchString && !this.tags) {
          this.searchResults = (
            await searchProjectByKeyword(this.searchString)
          ).data;
        } else if (!this.searchString && this.tags) {
          this.searchResults = (await searchProjectByTags(this.tags)).data;
        }

        this.$router.replace({
          query: {
            keyword: this.searchString,
            tags: this.searchTags ? JSON.stringify(this.searchTags) : null
          }
        });

        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    }
  },
  async mounted() {
    let q = this.$route.query;
    if (q) {
      this.searchString = q.keyword ? q.keyword : this.searchString;
      this.searchTags = q.searchTags
        ? JSON.parse(this.$route.query.tags)
        : this.searchTags;
      this.getResults()
    }
  }
};
</script>
