<template>
  <v-container fluid>
    <v-toolbar flat class="pt-3">
      <v-card-title class="display-1 font-weight-black">Patient</v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-toolbar>

    <v-data-table :headers="headers" :items="patients" :search="search" class="pa-3">
      <template v-slot:item.action="{ item }">
        <v-btn color="indigo" outlined dense @click="viewDetail(item)">
          <span class="caption">View Detail</span>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import store from "../store";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Patient ID",
          sortable: false,
          value: "patient_id"
        },
        { text: "Full Name", value: "fullname" },
        { text: "Gender", value: "gender" },
        { text: "Age", value: "age" },
        { text: "Birthday", value: "birthday" },
        { text: "", value: "action", sortable: false }
      ],
      patients: [],
      editedItem: {
        patient_id: "",
        name: "",
        gender: "",
        age: "",
        birthday: ""
      }
    };
  },

  mounted() {
    this.getPatients();
  },

  methods: {
    initialize() {
      this.patients = [];
    },

    viewDetail(item) {
      console.log(item);
      store.commit("selectItem", item);
    },
    getPatients() {
      const axios = require("axios");

      // Make a request for a user with a given ID
      axios
        .get("https://go-vue-rs.herokuapp.com/api/patient/")
        .then(response => {
          // handle success
          console.log(response);
          this.patients = response.data;

          this.patients.forEach(function(item) {
            item.fullname = item.first_name + " " + item.last_name;
            item.age =
              new Date().getFullYear() -
              new Date(item.date_of_birth).getFullYear();
            item.birthday = item.date_of_birth.substr(0, 10);
          });
        })
        .catch(error => {
          // handle error
          console.log(error);
          alert(error);
        });
    }
  }
};
</script>