<template>
  <v-container fluid>
    <v-toolbar flat class="pt-3">
      <v-card-title class="display-1">Patient Detail</v-card-title>
    </v-toolbar>
    <v-tabs v-model="tab" class="pa-3">
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="i in tabs" :key="i.title" :href="`#tab-${i.title}`">{{ i.title }}</v-tab>

      <v-tab-item v-for="i in tabs" :key="i.title" :value="'tab-' + i.title">
        <v-card flat tile>
          <MedicalHistory v-if="i.isMedicalHistory" />
          <Biography v-if="i.isBiography" />
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import Biography from "../components/Biography";
import MedicalHistory from "../components/MedicalHistory"

export default {
  data() {
    return {
      tab: null,
      tabs: [
        {
          title: "BIOGRAPHY",
          isBiography: true
        },
        {
          title: "MEDICAL HISTORY",
          isMedicalHistory: true
        }
      ]
    };
  },
  components: {
    Biography,
    MedicalHistory
  }
};
</script>