<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="hospitals" sort-by="hospital_id" class="pa-3">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="display-1 font-weight-black">Hospital</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on" width="150">Add Hospital</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="6" class="py-0 my-0">
                    <v-text-field v-model="editedItem.hospital_id" label="Code" dense outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="py-0 my-0">
                    <v-select v-model="editedItem.type" :items="types" label="Type" dense outlined></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" class="py-0 my-0">
                    <v-text-field v-model="editedItem.name" label="Name" dense outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="py-0 my-0">
                    <v-text-field v-model="editedItem.province" label="Province" dense outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="py-0 my-0">
                    <v-text-field v-model="editedItem.city" label="City" dense outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" class="py-0 my-0">
                    <v-textarea v-model="editedItem.address" label="Address" dense outlined></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="py-0 my-0">
                    <v-text-field v-model="editedItem.latitude" label="Latitude" dense outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="py-0 my-0">
                    <v-text-field v-model="editedItem.longitude" label="Longitude" dense outlined></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    types: ["RSU", "RSIA", "RSS"],
    headers: [
      {
        text: "Code",
        align: "start",
        value: "hospital_id"
      },
      { text: "Name", value: "name" },
      { text: "Type", value: "type" },
      { text: "City", value: "city" },
      { text: "Address", value: "address" },
      { text: "Actions", value: "action", sortable: false }
    ],
    hospitals: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      hospital_id: "",
      name: "",
      type: "",
      provice: "",
      city: "",
      address: "",
      latitude: 0,
      longitude: 0
    },
    defaultItem: {
      hospital_id: "",
      name: "",
      type: "",
      provice: "",
      city: "",
      address: "",
      latitude: 0,
      longitude: 0
    }
  }),

  mounted() {
    this.getHospitals();
    // alert("testing")
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Hospital" : "Edit Hospital";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.hospitals = [];
    },

    editItem(item) {
      this.editedIndex = this.hospitals.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      // const index = this.hospitals.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.deleteHospital(item.id);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        this.updateHospital(this.editedItem);
      } else {
        this.createHospital(this.editedItem);
      }
      this.close();
    },
 
    createHospital() {
      const axios = require("axios");

      // Make a request for a user with a given ID
      axios
        .post("https://go-vue-rs.herokuapp.com/api/hospital/", this.editedItem)
        .then(response => {
          // handle success
          console.log(response);

          this.getHospitals();
        })
        .catch(error => {
          // handle error
          console.log(error);
          alert.log(error);
        });
      this.close();
    },

    updateHospital() {
      const axios = require("axios");

      // Make a request for a user with a given ID
      axios
        .put("https://go-vue-rs.herokuapp.com/api/hospital/", this.editedItem)
        .then(response => {
          // handle success
          console.log(response);

          this.getHospitals();
        })
        .catch(error => {
          // handle error
          console.log(error);
          alert.log(error);
        });
      this.close();
    },

    getHospitals() {
      const axios = require("axios");

      // Make a request for a user with a given ID
      axios
        .get("https://go-vue-rs.herokuapp.com/api/hospital/")
        .then(response => {
          // handle success
          console.log(response);
          this.hospitals = response.data;
        })
        .catch(error => {
          // handle error
          console.log(error);
          alert(error);
        });
    },

    deleteHospital(id) {
      const axios = require("axios");

      // Make a request for a user with a given ID
      axios
        .delete("https://go-vue-rs.herokuapp.com/api/hospital/" + id)
        .then(response => {
          // handle success
          console.log(response);
          this.getHospitals();
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