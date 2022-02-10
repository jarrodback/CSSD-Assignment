  <template>
    <div class="vh-100 d-flex align-items-center justify-content-center">
      <b-card class="w-50" title="Sign in to NTG Self Service Portal">
        <template #default>
          <b-input-group class="flex-column p-3">
            <ValidationObserver ref="observer">
              <Input id="email" v-model="loginData.email" placeholder="Email..." rules="required|email" type="email" label="Email" />
              <Input id="password" v-model="loginData.password" placeholder="Password..." rules="required" type="password" label="Password" class="mt-3"/>
            </ValidationObserver>
            <span class="mt-4">New here? <b-link class="link">Sign up!</b-link></span> 
            <b-button id="login" variant="primary" class="mt-3" @click="login">Sign in</b-button>
          </b-input-group>
        </template>
      </b-card>
    </div>
</template>

<script>
import api from "../api/api";
import store from "../store/store";
import { ValidationObserver } from 'vee-validate'
import Input from "@/components/input";

export default {
    name: "login-form",
    components: {ValidationObserver, Input }, //Import validation observer to catch validation errors
    data() {
        return {
            loginData: {}, // The mapped form data.
        };
    },

    methods: {
        /**
         * On submitting of the form, send login request to API.
         */
        async login() {
            const valid = await this.$refs.observer.validate()
            if(!valid){
              return
            }
            api.login(this.loginData)
                .then((data) => {
                    // If successful, store returned user details and change route.
                    store.dispatch("updateLoggedIn", true);
                    store.dispatch("updateUser", {
                        id: data.id,
                        username: data.username,
                        type: data.type,
                    });
                    
                    if(store.getters.user.type == 'Toll Operator')
                    {
                      this.$router.push("view-users");
                    }
                    else
                    {
                      this.$router.push("my-bills");
                    }
                })
                .catch((error) => {
                  this.$bvToast.toast(error.message, {
                    title: 'Invalid email or password',
                    variant: 'danger',
                    solid: true
                  })
                });
        },
    },
};
</script>


