<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>

    <footer></footer>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {},
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #eeeeee;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
}
</style>
