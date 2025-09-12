<template>
  <v-layout fill-height align-center justify-center>
    <v-card width="80%" height="35%" min-height="220px">
      <v-card-text class="display-1">Forgot Password</v-card-text>
      <div style="padding:18px">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="nameRules"
            label="Enter Your Email Address"
            required
            outlined
          ></v-text-field>
        </v-form>

        <v-layout align-center justify-center>
          <v-btn to="/" text small color="primary">Back To Login</v-btn>
          <v-spacer></v-spacer>
          <v-btn to="/" depressed color="primary" width="150px">Reset</v-btn>
        </v-layout>
      </div>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    show1: false,
    password: "Password",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    }
  })
};
</script>