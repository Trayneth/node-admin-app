<template>
  <div class="index-page-container">
    <BannerTable />
  </div>
</template>

<script>
import index from '@/js/pages/home/banner/index.js';
export default {
  name: 'BannerPage',
  mixins: [index],
};
</script>
