<template>
  <NuxtLink :to="to">
    <button class="button" :to="to">{{label}}</button>
  </NuxtLink>
</template>

<script setup lang="ts">
  type ButtonPropsType = {
    label: string,
    to?:string,
  }

  const {label, to} = defineProps<ButtonPropsType>();

</script>



<style scoped lang="scss">
  .button{
    cursor: pointer;
    padding: 15px;
    border-radius: 25px;
    border: none;
    background: rgb(25, 25, 25);
    color: #fff;
  }
</style>