<template>
  <v-container fluid>
    <v-card flat width="50%" height="100%" min-height="320px" style="padding:18px">
      <v-card-title class="display-1">Setting</v-card-title>
      <v-card-text class="title">Change Password</v-card-text>
      <div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-2"
            label="Current Password"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="show1 = !show1"
            outlined
          ></v-text-field>
          <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-2"
            label=" New Password"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="show1 = !show1"
            outlined
          ></v-text-field>
          <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-2"
            label="Repeat Password"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="show1 = !show1"
            outlined
          ></v-text-field>
        </v-form>
        <v-layout justify-end>
          <v-btn to="/dashboard" depressed color="primary" width="180px">Change Password</v-btn>
        </v-layout>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
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