<template>
  <section class="main-wrapper">
  <header class="header">
    <NuxtLink to="/" class="header__link">
      <div>Back to main page</div>
    </NuxtLink>
    <NuxtLink to="/statistics" class="header__link">
      <div>Statistics</div>
    </NuxtLink>
  </header>

  <main class="main">
    <slot></slot>
  </main>
  </section>
</template>

<script setup lang="ts">

</script>


<style scoped lang="scss">
.main-wrapper{
  display: flex;
  flex-direction: column;
  height: 100%;

  .header{
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(25, 25, 25);
    &__link{
      color: #fff;
      text-decoration: none;
    }
  }

  .main{
    flex: 1;
    padding: 15px;
  }
}
</style>