  <template>
    <div class="vh-100 d-flex align-items-center justify-content-center">
        <b-card
            class="w-50"
            title="Register to use the NTG Self Service Portal"
        >
            <template #default>
                <b-input-group class="flex-column p-3">
                    <ValidationObserver ref="observer">
                        <Input
                            id="email"
                            v-model="registerData.email"
                            placeholder="Email..."
                            rules="required|email"
                            type="email"
                            label="Email"
                        />
                        <Input
                            id="username"
                            v-model="registerData.username"
                            placeholder="Username..."
                            rules="required"
                            type="text"
                            label="Username"
                            class="mt-3"
                        />
                        <Input
                            id="password"
                            v-model="registerData.password"
                            placeholder="Password..."
                            rules="required"
                            type="password"
                            label="Password"
                            class="mt-3"
                        />
                        <Input
                            id="confirm-password"
                            v-model="registerData.confirmPassword"
                            placeholder="Confirm password..."
                            rules="required"
                            type="password"
                            label="Confirm Password"
                            class="mt-3"
                        />
                    </ValidationObserver>
                    <b-button
                        variant="primary"
                        class="mt-3"
                        @click="register"
                    >Register</b-button>
                </b-input-group>
            </template>
        </b-card>
    </div>
</template>

<script>
import api from "../api/api";
import { ValidationObserver } from "vee-validate";
import Input from "@/components/input";

export default {
    name: "register-form",
    components: { ValidationObserver, Input }, //Import validation observer to catch validation errors
    data() {
        return {
            registerData: {}, // The mapped form data.
        };
    },

    methods: {
        /**
         * On submitting of the form, send login request to API.
         */
        async register() {
            const valid = await this.$refs.observer.validate();
            if (!valid) {
                return;
            }

            if (
                this.registerData.password !== this.registerData.confirmPassword
            ) {
                this.$bvToast.toast("Your passwords do not match.", {
                    title: "Unable to create an account",
                    variant: "danger",
                    solid: true,
                });

                return;
            }
            api.register(this.registerData)
                .then(() => {
                    this.$router.push("Login");
                })
                .catch((error) => {
                    this.$bvToast.toast(error.message, {
                        title: "Unable to create an account",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
    },
};
</script>


