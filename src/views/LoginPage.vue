<template>
  <v-container fluid fill-height pa-0>
    <v-layout row>
      <!-- Left Panel -->
      <v-flex md6 class="hidden-sm-and-down bg-color">
        <LeftPanel />
      </v-flex>
      <!-- Right Panel -->
      <v-flex md6 justify-center align-center>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LeftPanel from "../components/LeftPanel";

export default {

  components: {
    LeftPanel
  }
};
</script>

<style scoped>
.bg-color {
  background-color: blue;
  background-size: 100% 100%;
}
</style>