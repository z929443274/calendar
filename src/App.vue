<template>
  <div id="app">
    <YhCalendar />
  </div>
</template>

<script>
import YhCalendar from '@/MyPlugin/YhCalendar/YhCalendar';

export default {
  name: 'App',
  components: {
    YhCalendar,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
