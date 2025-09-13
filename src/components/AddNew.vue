<template>
  <v-container fluid class="pa-0">
    <!-- Carousel -->
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <v-sheet :color="images[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <v-col align="center">
              <div class="display-2">{{ carousel.slide }}</div>
              <v-btn large class="mt-5">{{ carousel.btn }}</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <!-- Stepper -->
    <v-stepper v-model="start" vertical>
      <div v-for="item in steps" :key="item.id">
        <v-stepper-step :complete="start > item.id" :step="item.id">
          <h3>{{item.title}}</h3>
          <p class="subtitle-2">{{item.subtitle}}</p>
        </v-stepper-step>

        <v-stepper-content :step="item.id">
          <v-container style="text-align: center;">
            <video-player
              v-if="item.isVideo"
              class="video-player-box"
              ref="videoPlayer"
              :options="item.playerOptions"
              :playsinline="true"
              customEventName="customstatechangedeventname"
              @play="onPlayerPlay($event)"
              @pause="onPlayerPause($event)"
              @ended="onPlayerEnded($event)"
              @waiting="onPlayerWaiting($event)"
              @playing="onPlayerPlaying($event)"
              @loadeddata="onPlayerLoadeddata($event)"
              @timeupdate="onPlayerTimeupdate($event)"
              @canplay="onPlayerCanplay($event)"
              @canplaythrough="onPlayerCanplaythrough($event)"
              @statechanged="playerStateChanged($event)"
              @ready="playerReadied"
              
            ></video-player>
          </v-container>

          <v-btn color="primary" @click="start = item.id + 1; onPlayerPause()">Continue</v-btn>
          <v-btn text @click="start = item.id - 1">Cancel</v-btn>
        </v-stepper-content>
      </div>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      start: 1,
      steps: [
        {
          id: 1,
          isVideo: true,
          title: "Step 1",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam adipisci fugiat placeat non libero officiis laboriosam error perferendis voluptas ipsam.",
          video_url: "http://vjs.zencdn.net/v/oceans.mp4",
          image_url:
            "https://149364066.v2.pressablecdn.com/wp-content/uploads/2017/03/vue.jpg",
          playerOptions: {
            height: "360",
            autoplay: false,
            muted: false,
            language: "en",
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [
              {
                type: "video/mp4",
                // mp4
                // src: "http://vjs.zencdn.net/v/oceans.mp4"
                // webm
                src:
                  "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
              }
            ],
            poster:
              "https://149364066.v2.pressablecdn.com/wp-content/uploads/2017/03/vue.jpg"
          }
        },
        {
          id: 2,
          isVideo: false,
          title: "Step 2",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam adipisci fugiat placeat non libero officiis laboriosam error perferendis voluptas ipsam.",
          video_url:
            "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
          image_url:
            "https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg",
          playerOptions: {
            height: "360",
            autoplay: false,
            muted: false,
            language: "en",
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [
              {
                type: "video/mp4",
                // mp4
                src: "http://vjs.zencdn.net/v/oceans.mp4"
                // webm
                // src:
                // "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
              }
            ],
            poster:
              "https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg"
          }
        },
        {
          id: 3,
          title: "Step 3",
          isVideo: true,
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam adipisci fugiat placeat non libero officiis laboriosam error perferendis voluptas ipsam.",
          video_url: "http://vjs.zencdn.net/v/oceans.mp4",
          image_url:
            "https://149364066.v2.pressablecdn.com/wp-content/uploads/2017/03/vue.jpg",
          playerOptions: {
            height: "360",
            autoplay: false,
            muted: false,
            language: "en",
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [
              {
                type: "video/mp4",
                // mp4
                // src: "http://vjs.zencdn.net/v/oceans.mp4"
                // webm
                src:
                  "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
              }
            ],
            poster:
              "https://149364066.v2.pressablecdn.com/wp-content/uploads/2017/03/vue.jpg"
          }
        },
        {
          id: 4,
          title: "Step 4",
          isVideo: true,
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam adipisci fugiat placeat non libero officiis laboriosam error perferendis voluptas ipsam.",
          video_url:
            "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
          image_url:
            "https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg",
          playerOptions: {
            height: "360",
            autoplay: false,
            muted: false,
            language: "en",
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [
              {
                type: "video/mp4",
                // mp4
                src: "http://vjs.zencdn.net/v/oceans.mp4"
                // webm
                // src:
                // "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
              }
            ],
            poster:
              "https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg"
          }
        }
      ],
      images: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      carousels: [
        { slide: "Carousel 1", btn: "Read More" },
        { slide: "Carousel 2", btn: "Read More" },
        { slide: "Carousel 3", btn: "Read More" },
        { slide: "Carousel 4", btn: "Read More" },
        { slide: "Carousel 5", btn: "Read More" }
      ]
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    setSourceAndThumbnail(videoUrl, imageUrl) {
      var a = this.playerOptions;
      a.sources[0].src = videoUrl;
      a.poster = imageUrl;
      return a;
    },
    onPlayerPlay(player) {
      console.log("player play!", player);
      alert("onPlayerPlay " + player)
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
            alert("onPlayerPause " + player)

    },

    playerStateChanged(playerCurrentState) {
      console.log("player current update state", playerCurrentState);
            alert("playerStateChanged " + player)

    },

    playerReadied(player) {
      console.log("the player is readied", player);
            alert("onPlayerPlay " + player)

      // you can use it to do something...
      // player.[methods]
    },
    stopPlayerBack(Player) {

    }
  }
};
</script>