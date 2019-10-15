<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

<div class="alert alert-success alert-dismissible fade show" role="alert">
  With Bootstrap!
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>

    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
        >babel</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
        >eslint</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
      margin: 5pt 0 0;
      font-size: 19pt

}
h3 {
  margin: 2pt 0 0;
  font-size: 12pt;
}
ul {
  /* list-style-type: none; */
  padding: 0;
  margin: 0
}
li {
  display: inline-block;
  margin: 0 5pt;
}
a {
  color: #42b983;
}
</style>
