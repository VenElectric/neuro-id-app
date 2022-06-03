<script setup>
import { onMounted, ref } from "vue";
import { OutComes, RouteNames } from "./static";
import { serverRequest } from "../Utils/serverRequest";
import states from "../static/states";
import router from "../router";

const pageId = "main-page";
const applicationId = "1234-5555-8888-9999";

onMounted(() => {
  nid("start", [pageId]);
  nid("setUserId", [applicationId]);
});

const customerInfo = ref({
  name_first: "",
  name_last: "",
  phone_number: "",
  email_address: "",
  address_line_1: "",
  address_line_2: "",
  address_city: "",
  address_state: "",
  address_postal_code: "",
  address_country_code: "",
  birth_date: "",
  document_ssn: "",
  neuro_user_id: applicationId,
  site_id: pageId,
});

// refs for zip code and ssn error messages
const zipCodeValidation = ref(false);
const ssnValidation = ref(false);

function numberCheck(value) {
  if (Number(value)) {
    return true;
  } else {
    return false;
  }
}

// check to see if SSN and Zip are numbers
// check to see if SSN is 9 digits and Zip is 5 digits
// set ref to true so v-if will show error message
function formValidation() {
  zipCodeValidation.value = false;
  ssnValidation.value = false;
  if (customerInfo.value.address_postal_code.length != 5) {
    zipCodeValidation.value = true;
  }
  if (!numberCheck(customerInfo.value.address_postal_code)) {
    zipCodeValidation.value = true;
  }
  if (customerInfo.value.document_ssn.length != 9) {
    ssnValidation.value = true;
  }
  if (!numberCheck(customerInfo.value.document_ssn)) {
    ssnValidation.value = true;
  }
}

async function formSubmit() {
  formValidation();
  if (zipCodeValidation.value == true || ssnValidation.value == true) return;
  if (customerInfo.value != null) {
    nid("applicationSubmit", [pageId]);
    nid("stop");
    const serverResponse = await serverRequest(customerInfo.value);
    try {
      if (serverResponse) {
        // turn request data into readable object
        const summaryData = JSON.parse(serverResponse.request.response);
        // switch through outcome data to provide appropriate splash screen
        switch (summaryData.outcome) {
          case OutComes.APPROVED:
            router.push({ name: RouteNames.SuccessPage });
            break;
          case OutComes.DENIED:
            router.push({ name: RouteNames.FailurePage });
            break;
          case OutComes.MANUAL_REVIEW:
            router.push({ name: RouteNames.PendingReviewPage });
            break;
          default:
            console.log(summaryData.outcome);
        }
      }
    } catch (error) {
      console.log(error);
      router.push({ name: RouteNames.ErrorPage });
    }
  }
}
</script>
<template>
  <div class="container">
    <div class="form-layout">
      <form @submit.prevent="formSubmit">
        <h2>Verification Form</h2>
        <h3>Step 1: Personal Identification</h3>
        <div class="cage">
          <div class="field">
            <small>First Name</small>
            <input
              type="text"
              v-model="customerInfo.name_first"
              id="name_first"
              placeholder="John"
              required
            />
          </div>
          <div class="field">
            <small>Last Name</small>
            <input
              type="text"
              v-model="customerInfo.name_last"
              id="name_last"
              placeholder="Doe"
              required
            />
          </div>
          <div class="field">
            <small>SSN</small>
            <input
              type="text"
              v-model="customerInfo.document_ssn"
              id="ssn"
              placeholder="9 Digits"
              required
            />
            <small v-if="ssnValidation" class="validation-error"
              >SSN should be 9 digits</small
            >
          </div>
          <div class="field">
            <small>Date of Birth</small>
            <input
              type="date"
              v-model="customerInfo.birth_date"
              id="birth_date"
              required
            />
          </div>
          <div class="field">
            <small>E-mail</small>
            <input
              type="email"
              v-model="customerInfo.email_address"
              id="email_address"
              placeholder="big_bird@sesame.com"
              required
            />
          </div>
          <div class="field">
            <small>Phone Number</small>
            <input
              type="tel"
              pattern="[0-9]{11,14}"
              id="phone_number"
              v-model="customerInfo.phone_number"
              placeholder="14158675309"
              required
            />
          </div>
        </div>

        <h3>Step 2: Address Information</h3>
        <div class="cage">
          <div class="field">
            <small>Address Line 1</small>
            <input
              type="text"
              id="address_line_1"
              v-model="customerInfo.address_line_1"
              placeholder="123 Sesame Street"
              required
            />
          </div>
          <div class="field">
            <small>Address Line 2</small>
            <input
              type="text"
              id="address_line_2"
              v-model="customerInfo.address_line_2"
              placeholder="Apt G"
            />
          </div>
          <div class="field">
            <small>City</small>
            <input
              type="text"
              id="address_city"
              v-model="customerInfo.address_city"
              placeholder="Muppetville"
              required
            />
          </div>
          <div class="field">
            <small>State</small>
            <select v-model="customerInfo.address_state" id="address_state">
              <option v-for="state in states" :value="state.abbreviation">
                {{ state.name }}
              </option>
            </select>
          </div>
          <div class="field">
            <small>ZIP Code</small>
            <input
              type="text"
              id="address_postal_code"
              v-model="customerInfo.address_postal_code"
              placeholder="86753"
              required
            />
            <small v-if="zipCodeValidation" class="validation-error"
              >ZIP Code should be 5 digits</small
            >
          </div>
          <div class="field">
            <small>Country</small>
            <select
              v-model="customerInfo.address_country_code"
              id="address_country_code"
            >
              <option value="US">United States</option>
            </select>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.form-layout {
  display: flex;
  align-self: center;
  width: 30%;
  padding: 2em;
  background: aliceblue;
  background: linear-gradient(
    180deg,
    antiquewhite 20%,
    rgba(120, 120, 216, 0.938) 96%
  );
  border-radius: 0.8em;
}
.cage {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
input {
  border-radius: 0.3em;
}
button {
  margin-top: 2em;
}
.field {
  display: flex;
  flex-direction: column;
  margin: 1em;
  padding: 0.1em;
  width: 10em;
}
.validation-error {
  margin: 0;
  margin-top: 0.5em;
  color: rgb(255, 0, 0);
  font-size: 0.7em;
  font-weight: bold;
}
</style>
