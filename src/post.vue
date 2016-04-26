<template>
  <div class="ui container">
    <div id="editor" class="demo"></div>
  </div>
</template>
<style>
.demo {
  background-color: #F5F5F0;
  -webkit-box-shadow: 0px 3px 15px 2px #F5F5F0;
  -moz-box-shadow: 0px 3px 15px 2px #F5F5F0;
  box-shadow: 0px 3px 15px 2px #F5F5F0;
  padding: 10px;
  border-bottom: 1px dashed #ccc;
  margin-bottom: 30px;
}
.Medium:focus {
	outline: 0;
	-webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.42);
	-moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.42);
	box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.42);
}
</style>
<script>
  export default {
    ready: function () {
      new Medium({
        element: document.getElementById('editor'),
        mode: Medium.richMode
      })
    }
  }
</script>
