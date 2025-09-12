<template>
  <v-container fluid>
    <!-- <v-row no-gutters>
      <v-col cols="9" class="pl-11">
        <h2>Doctor</h2>
      </v-col>
      <v-col cols="3">
        <v-btn color="#7e5445" class="white--text" @click.stop="drawer = !drawer">Add Staff</v-btn>
      </v-col>
    </v-row>-->

    <v-card-title class="font-weight-black display-1">
      DOCTOR
      <v-spacer></v-spacer>
      <v-btn color="#7e5445" class="white--text" @click.stop="drawer = !drawer; addItem()">Add Staff</v-btn>
      <!-- Nav right bar -->
      <v-navigation-drawer v-model="drawer" absolute temporary right width="450">
        <v-layout column class="pa-5">
          <v-card-title class="headline font-weight-black pb-1">{{ formTitle }}</v-card-title>
          <v-layout justify-center>
            <v-card class="ma-2" tile flat>
              <v-card-text>
                <img src="../assets/profile.png" height="115px" width="115px" justify-center>
                <div
                  align="center"
                  style="background-color: gray; position: relative; bottom: 27px; width: 115px;"
                ></div>
              </v-card-text>
            </v-card>
          </v-layout>
          <v-layout justify-center>
            <v-btn
              color="primary"
              class="text-none"
              round
              depressed
              :loading="isSelecting"
              @click="onButtonClick"
              width="300px"
            >{{ buttonText }}</v-btn>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              accept="image/*"
              @change="onFileChanged"
            />
          </v-layout>
          <v-layout class="pt-5">
            <v-flex md6 class="pr-1">
              <v-text-field v-model="editDoctor.first_name" label="Fist Name" single-line outlined></v-text-field>
            </v-flex>
            <v-flex md6 class>
              <v-text-field v-model="editDoctor.last_name" label="Last Name" single-line outlined></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout column wrap>
            <v-text-field v-model="editDoctor.doctor_id" label="Doctor ID" single-line outlined></v-text-field>
          </v-layout>
          <v-layout column wrap>
            <v-text-field
              v-model="editDoctor.specialist"
              label="Specialization"
              single-line
              outlined
            ></v-text-field>
          </v-layout>
          <v-layout column wrap>
            <v-text-field v-model="editDoctor.phone" label="phone" single-line outlined></v-text-field>
          </v-layout>
          <v-layout column wrap>
            <v-text-field
              v-model="editDoctor.license_number"
              label="Lisensi Number"
              single-line
              outlined
            ></v-text-field>
          </v-layout>
          <v-card-actions>
            <v-btn outlined large color="indigo" @click="close">Cancel</v-btn>
            <v-spacer></v-spacer>

            <v-btn depressed large color="primary" @click="save">Save</v-btn>
          </v-card-actions>
        </v-layout>
      </v-navigation-drawer>
      <!--Navigationdrawer  -->
    </v-card-title>

    <!-- tabble doctor -->

    <v-row>
      <v-col cols="4" v-for="doctor in doctors" :key="doctor.id" @click="editItem(doctors)">
        <v-card max-width="500px" @click="editItem(doctors)">
          <v-row no-gutters>
            <v-col cols="5" class="pa-2">
              <v-img :src="doctor.image_url" height="150"></v-img>
              <v-card-subtile
                class="subtitle-2 font-weight-bold"
                style="align: center;"
              >{{ doctor.doctor_id }}</v-card-subtile>
            </v-col>

            <v-col cols="7">
              <v-list-item>
                <v-list-item-content>
                  <v-card-text
                    class="headline font-weight-black px-0 py-0"
                  >{{ doctor.first_name + " " + doctor.last_name }}</v-card-text>
                  <v-card-subtile
                    style="color: blue;"
                    class="subtitle-2 font-weight-bold"
                  >{{ doctor.specialist }}</v-card-subtile>
                  <v-text class="pt-2 subtitle-2 font-weight-bold">Phone: {{ doctor.phone }}</v-text>
                  <v-text class="pt-2 subtitle-2 font-weight-bold">
                    Lisensi No:
                    <br />
                    {{ doctor.license_number }}
                  </v-text>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- tabble doctor -->

    <v-pagination v-model="page" :length="headlines.length"></v-pagination>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      defaultButtonText: "UPLOAD FOTO",
      selectedFile: null,
      isSelecting: false,

      drawer: false,
      isEdit: false,
      doctors: [],
      editedIndex: -1,
      editDoctor: {
        id: 0,
        doctor_id: " ",
        first_name: " ",
        last_name: " ",
        specialist: " ",
        phone: " ",
        license_number: " ",
        image_url: " "
      },
      defalutItem: {
        doctor_id: "",
        first_name: "",
        last_name: "",
        specialist: "",
        phone: "",
        license_number: "",
        image_url: ""
      },

      page: 1,
      headlines: [
        "headline1",
        "headline2",
        "headline3",
        "headline4",
        "headline5"
      ],
      subtitles: [
        "Greyhound divisely hello coldly fonwderfully",
        "Greyhound divisely hello sunny wonderful",
        "Flower expected coldly fonwderfully",
        "Flower sunny hello",
        "Greyhound flower"
      ]
    };
  },
  mounted() {
    this.getDoctors();
  },
  created() {
    this.initialize();
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  computed: {
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    },
    formTitle() {
      return this.isEdit === false ? "Add Doctor" : "Edit Doctor";
      // return this.editedIndex === -1 ? "Add Doctor" : "Edit Doctor";
    }
  },
  methods: {
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];

      // do something
    },
    initialize() {
      this.doctors = [];
    },
    addItem() {
      this.isEdit = false;
      this.item = Object.assign({}, this.defaultItem);
    },

    close() {
      this.drawer = false;
      this.isEdit = false;
      // setTimeout(() => {
      //   this.editDoctor = Object.assign({}, this.defaultDoctor);
      //   this.editedIndex = -1;
      // }, 300);
    },

    save() {
      if (this.isEdit > -1) {
        this.updateDoctor(this.editDoctor);
      } else {
        this.createDoctor(this.editDoctor);
      }
      this.close();
    },

    editDoctor(item) {
      // alert("itemnya : " + JSON.stringify(item));
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
        .post("https://go-vue-rs.herokuapp.com/api/doctor/", this.editDoctor)
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
        .put("https://go-vue-rs.herokuapp.com/api/doctor/", this.editedItem)
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
    }
  }
};
</script>

<style scoped>
.pager {
  border-style: 2px 2px solid;
}
</style>