<template>
  <div class="base-loader" data-testid="base-loader">
    <span class="base-loader__icon"></span>
    <span>Loading...</span>
  </div>
</template>

<style scoped>
.base-loader {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &__icon {
    width: 24px;
    height: 24px;
    border: 4px dotted #fff;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 2.5s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
