<script setup>
import ReturnHome from './ReturnHome.vue';
</script>

<template>
  <div class="container">
    <div class="pending-cage">
      <h2 class="heading">Success!</h2>
      <div class="text-border">
        <p>
          Your rock solid customer report has approved you at the Sesame Credit
          Union for the Rocko Credit Line
        </p>
        <p>You can expect your Rocko Card to arrive within 3-5 business days</p>
        <p>
          If it doesn't arrive, please update your imagination so that the Rocko
          Credit Line comes into existence
        </p>
      </div>
      <ReturnHome></ReturnHome>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.pending-cage {
  align-self: center;
  width: 30%;
  border-radius: 2em;
  background-color: aliceblue;
  padding: 5em;
}
.heading {
  background-color: rgb(120, 120, 216);
  align-self: center;
  border-radius: 2em;
  margin-bottom: 2em;
   box-shadow: 10px 5px 5px aqua;
}
.text-border {
  border: solid black 0.5em;
  border-radius: 2em;
  padding: 1em;
  background-color: antiquewhite;
}
</style>
