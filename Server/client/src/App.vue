<template>
  <div id='app'>
    <router-view />

  </div>
    
</template>

<script>
//安装jwt-decode 用来解析token
//导入jwt - decode
import jwt_decode from "jwt-decode";
let that = this;
export default {
  name: "",
  props: [""],
  

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},
  created:function() {
    if (localStorage.eleToken) {
      const decode = jwt_decode(localStorage.eleToken);

      //token存储到vuex中
      this.$store.dispatch("setAuthenticated", !this.isEmpyy(decode));
      this.$store.dispatch("setUser", decode);
    }
  },
  methods: {
    isEmpyy: function(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style>
  
#app{
  width: 100%;
  height: 100%;
}
</style>
