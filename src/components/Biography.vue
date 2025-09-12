<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="5">
        <v-card height="100%" color="red">
          <v-list dense>
            <v-list-item>
              <v-list-item-content class="font-weight-bold">Patient ID</v-list-item-content>
              <v-list-item-content class="align-end">{{ patient.patient_id }}</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="font-weight-bold">First Name</v-list-item-content>
              <v-list-item-content class="align-end">{{ patient.first_name }}</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="font-weight-bold">Last Name</v-list-item-content>
              <v-list-item-content class="align-end">{{ patient.last_name }}</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="font-weight-bold">Gender</v-list-item-content>
              <v-list-item-content class="align-end">{{ patient.gender }}</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="font-weight-bold">Age</v-list-item-content>
              <v-list-item-content class="align-end">{{ patient.age }}</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="font-weight-bold">Birthday</v-list-item-content>
              <v-list-item-content class="align-end">{{ patient.birthday }}</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="font-weight-bold">Phone</v-list-item-content>
              <v-list-item-content class="align-end">{{ patient.phone }}</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="font-weight-bold">Address</v-list-item-content>
              <v-list-item-content class="align-end">{{ patient.address }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="7">
        <v-card height="100%" color="blue">
          <v-img src="../assets/logo.png" max-width="200px" style="margin: auto" class="pt-50"></v-img>

          <div style="text-align: center" class="mt-5">
            <v-btn large width="70%">EMAIL</v-btn>
          </div>
          <div style="text-align: center" class="mt-5">
            <v-btn large width="70%">WHATSAPP</v-btn>
          </div>
          <!-- <v-img src="../assets/logo.png" max-width="300px"></v-img>
            <v-btn>EMAIL</v-btn>
          <v-btn>WHATSAPP</v-btn>-->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from "../store";

export default {
  data() {
    return {
      patient: {}
    };
  },
  mounted() {
    this.patient = store.state.patient;
    // this.showAlert();
  },

  methods: {
    showAlert() {
      alert("testingbaru123")
      alert(JSON.stringify(store.state.patient))
    },
  }
};
</script>