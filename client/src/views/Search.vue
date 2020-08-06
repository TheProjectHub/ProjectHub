<template>
  <v-app>
    <v-main class="gradient-background">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md5>
            <v-card class="mx-auto" max-width="700" outlined>
              <v-card-actions class="justify-center">
                <v-text-field
                  label="Find Project By Name"
                  placeholder="ex: Java, ML, Blockchain, AI, [buzzword]"
                  v-model="searchString"
                ></v-text-field>
              </v-card-actions>
              <v-card-actions class="justify-right">
                <v-btn depressed @click="showResults" class="info white--text">
                  <span>Search</span>
                </v-btn>
              </v-card-actions>
            </v-card>
            search string
            {{ searchString }}
            <br>
            search tags
            {{ searchTags }}
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchString: "",
      searchTags: []
    };
  },
  methods: {
    async showResults() {
      if (!this.searchString && !this.searchTags) {
        return;
      }
      try {
        await this.$router.replace({
          path: "search",
          query: {
            keyword: this.searchString,
            tags: JSON.stringify(this.searchTags)
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    if (this.$route.query) {
      this.searchString = this.$route.query.keyword;
      this.searchTags = JSON.parse(this.$route.query.tags);
      await this.showResults();
    }
  }
};
</script>
