<template>
  <div class="index-page-container">
    <RoleTable />
  </div>
</template>

<script>
import index from '@/js/pages/security/role/index.js';
export default {
  name: 'RolePage',
  mixins: [index],
};
</script>
