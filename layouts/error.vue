<template>
  <div>
    <template v-if="error.message == 'Network Error'">
      <Offline />
    </template>
    <template v-else>
      <h1 v-if="error.statusCode === 404"><NotFound /></h1>
      <h1 v-if="error.statusCode === 403">
        <Forbidden />
      </h1>
      <h1 v-else-if="error.statusCode === 500"><ServerError /></h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
    </template>
  </div>
</template>

<script>
import Offline from "@/components/Offline";
import Forbidden from "@/components/error-message/Forbidden";
import NotFound from "@/components/error-message/NotFound";
import ServerError from "@/components/error-message/ServerError";
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  components: { Offline, Forbidden, NotFound, ServerError },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style>
h1 {
  font-size: 20px;
}

/* CSS */
</style>
