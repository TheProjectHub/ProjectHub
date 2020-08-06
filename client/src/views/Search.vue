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
                <v-btn depressed @click="redirect" class="info white--text">
                  <span>Search</span>
                </v-btn>
              </v-card-actions>
            </v-card>
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
      searchTags: ["hm", "ok"]
    };
  },
  methods: {
    showResults() {
      if (!this.searchString && !this.searchTags) {
        return;
      }

      this.$router
        .replace({
          path: "search",
          query: {
            keyword: this.searchString,
            tags: JSON.stringify(this.searchTags)
          }
        })
        .catch(err => {
          console.log(`error while making search query ${err}`);
        });
    }
  },
  mounted() {}
};
</script>
