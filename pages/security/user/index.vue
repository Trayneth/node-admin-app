<template>
  <div class="index-page-container">
    <UserTable />
  </div>
</template>

<script>
import index from '@/js/pages/security/user/index.js';
export default {
  name: 'UserPage',
  mixins: [index],
};
</script>
