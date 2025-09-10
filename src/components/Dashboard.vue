<template>
  <v-container>
    <v-row>
      <v-col md4 v-for="item in summary" :key="item.title">
        <v-card>
          <v-card-title>Total {{ item.title }}</v-card-title>
          <v-card-subtitle v-text="item.total"></v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      summary: [
        {
          title: "Hospital",
          total: 100
        },
        {
          title: "Doctor",
          total: 200
        },
        {
          title: "Patient",
          total: 300
        }
      ],
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
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