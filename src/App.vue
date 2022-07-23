<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  height: 100vh;
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
