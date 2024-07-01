<template>
  <ruby>
    <slot></slot>
    <rp>(</rp>
    <rt>{{ props.anno }}</rt>
    <rp>)</rp>
  </ruby>
</template>

<script setup lang="ts">
const props = defineProps({
  anno: {
    type: String,
    default: "",
  },
});
</script>

<style>
ruby > rt {
  font-size: 100%;
  zoom: 0.75;
}
</style>
