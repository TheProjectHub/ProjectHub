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
                ></v-text-field>

                <v-btn icon @click="showResults">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-toolbar>
            </v-card>

            search string
            {{ searchString }}
            <br />
            search tags
            {{ searchTags }}
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
import { formQuery } from "../utilities/search/query.utilities";

export default {
  name: "Search",
  data() {
    return {
      searchString: "",
      searchTags: [],
      searchResults: []
    };
  },
  methods: {
    async showResults() {
      if (!this.searchString && !this.searchTags) {
        return;
      }

      try {
        let q = formQuery(this.searchString, this.tags);

        if (this.searchString && this.tags) {
          this.searchResults = await searchProjectByKeywordTags(q);
        } else if (this.searchString && !this.tags) {
          this.searchResults = await searchProjectByKeyword(q);
        } else if (!this.searchString && this.tags) {
          this.searchResults = await searchProjectByTags(q);
        }

        this.$router.replace({
          query: {
            keyword: this.searchString,
            tags: this.searchTags ? JSON.stringify(this.searchTags) : null
          }
        });
      } catch (err) {
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
      await this.showResults();
    }
  }
};
</script>
