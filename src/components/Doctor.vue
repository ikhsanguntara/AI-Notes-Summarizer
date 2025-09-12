<template>
  <v-container fluid>
    <v-toolbar flat color="white" class="pa-3 mb-5">
      <v-toolbar-title class="font-weight-black display-1">Doctor</v-toolbar-title>
      <v-spacer></v-spacer>
      <template>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          @click="drawer = !drawer; addItem()"
          width="150"
        >Add Doctor</v-btn>
      </template>
    </v-toolbar>

    <!-- Side Panel Drawer -->
    <v-navigation-drawer v-model="drawer" absolute height="100%" width="400" temporary right>
      <v-card flat>
        <v-card-title class="headline">{{ formTitle }}</v-card-title>
        <v-img :src="item.image_url" width="100"></v-img>

        <div style="text-align: center">
          <picture-input
            ref="pictureInput"
            width="150"
            height="150"
            margin="16"
            accept="image/jpeg, image/png"
            size="10"
            button-class="btn"
            :custom-strings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag a 😺 GIF or GTFO'
      }"
            @change="onChange"
          ></picture-input>
        </div>

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6" class="pr-1 py-0 my-0">
              <v-text-field v-model="item.first_name" label="First Name" dense outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="pl-1 py-0 my-0">
              <v-text-field v-model="item.last_name" label="Last Name" dense outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0 my-0">
              <v-text-field v-model="item.doctor_id" label="Doctor ID" dense outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0 my-0">
              <v-text-field v-model="item.specialist" label="Specialization" dense outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0 my-0">
              <v-text-field v-model="item.phone" label="Phone" dense outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0 my-0">
              <v-text-field v-model="item.license_number" label="License Number" dense outlined></v-text-field>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-icon large color="red" v-if="isEdit" @click="deleteItem(item)">mdi-delete</v-icon>
            <v-spacer></v-spacer>
            <!-- <v-btn v-if = "isEdit" color="blue darken-1" text @click="close">Cancel</v-btn> -->
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="primary" width="100" @click="save">Save</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>

    <!-- Card Doctor -->
    <v-row>
      <v-col sm="6" md="4" v-for="doctor in doctors" :key="doctor.id" @click="editDoctor(doctor)">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 6 : 2" class="mx-auto">
            <v-row align="center">
              <v-col sm="5" class="pr-0 pb-0">
                <v-img
                  :src="doctor.image_url"
                  style="text-align: center"
                  height="150"
                  max-width="150"
                ></v-img>
                <v-card-text style="text-align: center" class="pb-2">{{ doctor.doctor_id }}</v-card-text>
              </v-col>
              <v-col sm="7" class="pl-1 pb-0">
                <v-card-text
                  class="pb-0 subtitle-1 font-weight-bold"
                >{{ doctor.first_name }} {{ doctor.last_name }}</v-card-text>
                <v-card-text class="pt-0" style="color: blue">{{ doctor.specialist }}</v-card-text>
                <v-card-text class="pt-0">Phone: {{ doctor.phone }}</v-card-text>
                <v-card-text class="pt-0">
                  License Number:
                  <br />
                  {{ doctor.license_number }}
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination v-model="page" :length="4" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import PictureInput from "vue-picture-input";

export default {
  data: () => ({
    selectedFile: null,
    isSelecting: false,
    drawer: false,
    page: 1,
    doctors: [],
    isEdit: false,
    editedIndex: -1,
    item: {
      id: 0,
      doctor_id: "",
      first_name: "",
      last_name: "",
      specialist: "",
      license_number: "",
      phone: "",
      image_url: ""
    },
    defaultItem: {
      doctor_id: "",
      first_name: "",
      last_name: "",
      specialist: "",
      license_number: "",
      phone: "",
      image_url: ""
    }
  }),
  components: {
    PictureInput
  },
  computed: {
    formTitle() {
      return this.isEdit === false ? "Add Doctor" : "Edit Doctor";
      // return this.editedIndex === -1 ? "Add Doctor" : "Edit Doctor";
    },
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    }
  },

  watch: {
    drawer(val) {
      val || this.close();
    }
  },

  mounted() {
    this.getDoctors();
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.doctors = [];
    },

    addItem() {
      this.isEdit = false;
      this.item = Object.assign({}, this.defaultItem);
    },

    deleteItem(item) {
      // const index = this.hospitals.indexOf(item);
      confirm("Are you sure you want to delete this doctor?") &&
        this.deleteDoctor(item.id);
      this.drawer = false;
    },

    close() {
      this.drawer = false;
      this.isEdit = false;
      // setTimeout(() => {
      //   this.editedDoctor = Object.assign({}, this.defaultDoctor);
      //   this.editedIndex = -1;
      // }, 300);
    },

    save() {
      if (this.isEdit === true) {
        this.updateDoctor(this.item);
      } else {
        this.createDoctor(this.item);
      }
      this.close();
    },

    editDoctor(item) {
      this.item = Object.assign({}, item);
      this.isEdit = true;
      // this.editedIndex = this.doctors.indexOf(item);
      // this.editedDoctor = Object.assign({}, item);
      this.drawer = true;
    },

    createDoctor() {
      const axios = require("axios");

      // Make a request for a user with a given ID
      axios
        .post("https://go-vue-rs.herokuapp.com/api/doctor/", this.item)
        .then(response => {
          // handle success
          console.log(response);
          this.getDoctors();
        })
        .catch(error => {
          // handle error
          console.log(error);
          alert.log(error);
        });
      this.close();
    },

    getDoctors() {
      const axios = require("axios");

      // Make a request for a user with a given ID
      axios
        .get("https://go-vue-rs.herokuapp.com/api/doctor/")
        .then(response => {
          // handle success
          console.log(response);
          this.doctors = response.data;
        })
        .catch(error => {
          // handle error
          console.log(error);
          alert(error);
        });
    },

    updateDoctor() {
      const axios = require("axios");

      // Make a request for a user with a given ID
      axios
        .put("https://go-vue-rs.herokuapp.com/api/doctor/", this.item)
        .then(response => {
          // handle success
          console.log(response);

          this.getDoctors();
        })
        .catch(error => {
          // handle error
          console.log(error);
          alert.log(error);
        });
      this.close();
    },

    deleteDoctor(id) {
      const axios = require("axios");

      // Make a request for a user with a given ID
      axios
        .delete("https://go-vue-rs.herokuapp.com/api/doctor/" + id)
        .then(response => {
          // handle success
          console.log(response);
          this.getDoctors();
        })
        .catch(error => {
          // handle error
          console.log(error);
          alert(error);
        });
    },
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        this.image = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    }
  }
};
</script>

<style scoped>
</style>