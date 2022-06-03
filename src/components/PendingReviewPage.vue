<script setup>
import ReturnHome from './ReturnHome.vue';
</script>

<template>
  <div class="container">
    <div class="pending-cage">
      <h2 class="heading">There's still hope yet!</h2>
      <div class="text-border">
        <p>
          Thank you for submitting your information for the Rocko Credit Line
        </p>
        <p>
          Our imagination analysts are hard at work reviewing your case and will
          touch base with you shortly.
        </p>
        <p>Keep on believing to increase your chances of success!</p>
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
