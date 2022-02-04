  <template>
    <div class="center login-div">
        <b-form
            ref="loginRequestForm"
            @submit="onSubmit"
        >
            <b-form-group
                label="Email"
                label-for="email-input"
                invalid-feedback="Email is required"
            >
                <b-form-input
                    type="email"
                    id="email-input"
                    v-model="loginData.email"
                    placeholder="Enter email"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Password"
                label-for="password-input"
                invalid-feedback="Password is required"
            >
                <b-form-input
                    type="password"
                    id="password-input"
                    v-model="loginData.password"
                    placeholder="Enter password"
                    required
                ></b-form-input>
                <div class="submit-space">
                    <b-button
                        type="submit"
                        variant="primary"
                    >Login</b-button>
                </div>
            </b-form-group>

        </b-form>
    </div>
</template>

<script>
import api from "../api/api";
import store from "../store/store";

export default {
    name: "login-form",

    data() {
        return {
            // The mapped form data.
            loginData: {},
        };
    },

    methods: {
        /**
         * On submitting of the form, send login request to API.
         */
        onSubmit(event) {
            event.preventDefault();
            api.login(this.loginData)
                .then((data) => {
                    // If successful, store returned user details and change route.
                    store.dispatch("updateLoggedIn", true);
                    store.dispatch("updateUser", {
                        id: data.id,
                        username: data.username,
                        type: data.type,
                    });

                    this.$router.push("my-bills");
                })
                .catch((error) => {
                    // TODO: do something pretty to tell the user <3
                    console.log(error);
                });
        },
    },
};
</script>


