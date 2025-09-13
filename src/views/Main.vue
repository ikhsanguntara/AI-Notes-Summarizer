<template>
  <v-container fluid pa-0 ma-0>
    <NavigationDrawer />
      <router-view></router-view>
  </v-container>
</template>

<script>
import NavigationDrawer from "../components/NavigationDrawer";

export default {
  name: "Main",

  components: {
    NavigationDrawer
  }
};
</script>
