<template>
  <router-view />
</template>

<script>
import "@/style/common.less";

export default {
  name: "App",
  provide() {
    return {
      app: this,
    };
  },
};
</script>
