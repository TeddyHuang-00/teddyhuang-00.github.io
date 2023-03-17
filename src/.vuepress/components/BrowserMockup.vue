<template>
  <div
    class="bg-bg-secondary shadow-2xl shadow-card-shadow relative rounded-lg pt-8 overflow-hidden my-5"
  >
    <div class="absolute left-3 flex justify-between w-12 top-2.5">
      <span class="w-3 h-3 rounded-full bg-rose-400"></span>
      <span class="w-3 h-3 rounded-full bg-amber-400"></span>
      <span class="w-3 h-3 rounded-full bg-green-400"></span>
    </div>
    <div v-if="$slots.default!()[0].props?.alt || props.alt !== ''">
      <div
        class="absolute block text-sm font-mono pl-1 top-1.5 left-20 right-10 h-5 bg-bg-tertiary rounded-sm overflow-x-scroll whitespace-nowrap"
      >
        {{ $slots.default!()[0].props?.alt || props.alt }}
      </div>
    </div>
    <div class="w-full leading-3 block">
      <slot>
        <div class="w-full h-96 bg-bg-secondary">
          <div class="w-full h-full flex justify-center items-center">
            <span class="text-text-color animate-spin text-2xl">
              <FontIcon icon="material-symbols:hourglass-top" />
            </span>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  alt: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
