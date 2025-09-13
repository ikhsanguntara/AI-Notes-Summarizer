<template>
  <v-container fluid fill-height pa-0 ma-0>
    <v-toolbar
      color="blue"
      dark
      app
      prominent
      clipped-right
      permanent
      height="55"
      flat
      class="elevation-1"
    >
      <v-btn icon v-if="!mini" @click="onMini" class="hidden-md-and-down">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn icon v-if="mini" @click="onMini" class="hidden-md-and-down">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up"></v-toolbar-side-icon>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-avatar>
          <v-img :src="require('../assets/logo.png')"></v-img>
        </v-avatar>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer
      :mini-variant.sync="mini"
      v-model="drawer"
      app
      width="250"
      id="sidebar"
      class="el1 elevation-1"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <!-- Dashboard -->
        <v-list-item to="/dashboard">
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Master -->
        <v-list-group v-for="item in items" :key="item.title" :prepend-icon="item.icon" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.action">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- Setting -->
        <v-list-group v-for="item in items2" :key="item.title" :prepend-icon="item.icon" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.action">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- Counseling -->
        <v-list-group v-for="item in items3" :key="item.title" :prepend-icon="item.icon" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.action">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- Logout -->
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      mini: false,
      active: false,
      items: [
        {
          title: "Master",
          icon: "mdi-account",
          items: [
            {
              title: "Hospital",
              icon: "mdi-account",
              action: "/hospital"
            },
            { title: "Doctor", icon: "mdi-account", action: "/doctor" },
            { title: "Patient", icon: "mdi-account", action: "/patient" },

            { title: "Test", icon: "mdi-account", action: "/test" },
            { title: "Tes2", icon: "mdi-account", action: "/tes" }
          ]
        }
      ],
      items2: [
        {
          title: "Setting",
          icon: "mdi-account",
          items: [
            {
              title: "Change Password",
              icon: "mdi-account",
              action: "/changePassword"
            },
            { title: "User", icon: "mdi-account", action: "/user" }
          ]
        }
      ],
      items3: [
        {
          title: "Counseling",
         icon: "mdi-account",
         items: [
             { title: "Add New", icon: "mdi-account", action: "/add_new" },
             { title: "Payment", icon: "mdi-account", action: "/payment" },
             { title: "Timeline", icon: "mdi-account", action: "/timeline" },
         ]
        }
      ]
    };
  },
  methods: {
    onMini() {
      if (!this.mini) {
        this.mini = true;
      } else {
        this.mini = false;
      }
    }
  }
};
</script>

<style scoped>
.el1 {
  max-height: 100%;
}
</style>
