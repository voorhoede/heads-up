<template>
  <external-link
    class="github-link"
    href="https://github.com/voorhoede/heads-up"
  >
    <span class="a11y-sr-only">Go to the Github repository</span>
    <app-icon name="github" class="github-link__icon" aria-hidden="true" />
  </external-link>
</template>

<script>
import ExternalLink from '@shared/components/external-link';
import AppIcon from './app-icon';

export default {
  components: {
    ExternalLink,
    AppIcon,
  },
};
</script>

<style>
.github-link {
  display: block;
  margin-top: 0.5rem;
}
.github-link__icon {
  color: var(--color-black);
  height: 20px;
  width: 20px;
}
</style>
