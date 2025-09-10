<template>
 <v-container fluid class="grey lighten-5">
    <v-row no-gutters>
      <v-col v-for="user in users" :key="user.id" cols="12" sm="4">
        <v-card class="ma-1">
          <v-card-title>{{ user.role }}</v-card-title>
          <v-card-subtitle>{{ user.email }}</v-card-subtitle>
          <v-card-text>Password : {{ user.password }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  
  data: () => ({
    users: []
  }),
   mounted () {
    const axios = require('axios');

// Make a request for a user with a given ID
axios.get('https://go-vue-rs.herokuapp.com/api/user/')
  .then(response => {
    // handle success
    console.log(response);
    this.users = response.data
  })
  .catch(error => {
    // handle error
    console.log(error);
  })
  }
};
</script>

<style lang="scss" scoped>
</style>