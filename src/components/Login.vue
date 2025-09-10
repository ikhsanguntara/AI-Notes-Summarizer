<template>
  <v-layout fill-height align-center justify-center>
    <v-card width="80%" height="50%" min-height="320px">
      <v-card-text class="display-1">Login</v-card-text>
      <div style="padding:18px">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="username" :rules="nameRules" label="Username" required outlined></v-text-field>
          <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="show1 = !show1"
            outlined
          ></v-text-field>
        </v-form>
        <v-layout align-center>
          <v-btn to="/forgotpass" text small color="primary">Forgot Password</v-btn>
          <v-spacer></v-spacer>
          <v-btn to="/dashboard" depressed color="primary" width="150px">Login</v-btn>
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