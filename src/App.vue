<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap');

html {
  height: 100%;
  scroll-behavior: smooth;
}

.container {
	display: flex;
  justify-content: center;
  padding: 50px 0;
}
</style>
