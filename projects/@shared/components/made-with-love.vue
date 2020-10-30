<template>
  <div class="made-with-love">
    Made with <span class="made-with-love-heart">&hearts;</span> by <br />
    <external-link  href="https://www.voorhoede.nl">
      De Voorhoede
    </external-link>
  </div>
</template>

<script>
import ExternalLink from '@shared/components/external-link';
export default {
  components: {
    ExternalLink,
  },
};
</script>

<style>
.made-with-love a {
  color: inherit;
  text-decoration: none;
  font-weight: bold;
}

.made-with-love-heart {
  color: var(--color-blue);
  transition: transform 200ms ease-in-out;
  animation: heartBeat 2s;
  display: inline-block;
  animation-iteration-count: infinite;
}

@keyframes heartBeat {
  0%, 100% {transform: scale(1);}
  25% {transform: scale(.97);}
  35%, 55% {transform: scale(.9);}
  45%, 65% {transform: scale(1.1);}
  75% {transform: scale(1.03);}
}
</style>
