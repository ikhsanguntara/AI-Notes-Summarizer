<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-data-iterator :items="items" hide-default-footer>
          <template v-slot:default="props">
            <v-row>
              <v-col v-for="item in props.items" :key="item.patient_id" cols="12" sm="6" md="10">
                <v-card flat>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content class="font-weight-bold">Patient ID</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.patient_id }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content class="font-weight-bold">First Name</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.first_name }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content class="font-weight-bold">Last Name</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.last_name }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content class="font-weight-bold">Gender</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.gender }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content class="font-weight-bold">Age</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.age }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content class="font-weight-bold">Birthday</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.birthday }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content class="font-weight-bold">Phone</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.phone }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content class="font-weight-bold">Address</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.address }}</v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        patient_id: "USR-001",
        first_name: "James",
        last_name: "Riyadi",
        gender: "Male",
        birthday: "2001/01/12",
        age: 19,
        phone: "0812 1231 1371",
        address: "Jln Mahakam Raya Jakarta, 17420"
      }
    ],
    center: { lat: 45.508, lng: -73.587 },
    markers: [],
    places: [],
    currentPlace: null
  }),
  
  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>