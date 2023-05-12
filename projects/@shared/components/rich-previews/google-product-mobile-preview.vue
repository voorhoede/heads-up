<template>
  <div class="google-product-mobile-preview">
    <h3 class="iframe-heading" :class="{ 'iframe-heading--dark-mode': isDarkMode }">Product</h3>
    <div v-if="!hasRequiredData" class="warning-message">
      <app-icon name="warning" />
      <p>This page does not contain the necessary metadata to create a preview.</p>
    </div>

    <template v-else>
      <div class="scroll-container">
        <div class="scroll-container__inner">
          <div class="product">
            <div class="product__wrapper">
              <img :src="image" class="product__image" />
              <div class="product__content">
                <p class="product__name">{{ name }}</p>
                <p v-if="hasRating" class="product__review">
                  <span class="review__stars-wrapper">
                    <span :class="`review__stars-${aggregateRatingValue}`"></span>
                  </span>
                  ({{ aggregateReviewCount }})
                </p>
              </div>
            </div>
            <div class="product__price-wrapper">
              <div>
                <span class="product__price">{{ offerPrice }}</span>
                <span class="product__merchant-name">{{ offerSellerName }}</span>
              </div>
              <img class="product__external-link" src="./assets/google-external-link.png" />
            </div>
          </div>
        </div>
      </div>

      <div class="scroll-container--fake">
        <ul class="product-carrousel">
          <li class="product-carrousel__item">
            <div class="product">
              <div class="product__wrapper">
                <img :src="image" class="product__image" />
                <div class="product__content">
                  <a rel="noopener" target="_blank" class="product__name">{{ name }}</a>
                  <div>
                    <span class="product__price">{{ offerPrice }}</span>
                    <a rel="noopener" target="_blank" class="product__merchant-name">{{ offerSellerName }}</a>
                  </div>
                  <a v-if="hasRating" rel="noopener" target="_blank" class="product__review">
                    <span class="review__stars-wrapper">
                      <span :class="`review__stars-${aggregateRatingValue}`"></span>
                    </span>
                    ({{ aggregateReviewCount }})
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li v-for="index in 4" :key="index"  class="product-carrousel__item">
            <div class="product product--no-hover">
              <div class="product__wrapper">
                <div class="product__image product__skeleton-image"></div>
                <div class="product__content">
                  <div class="product__name product__skeleton-text"></div>
                  <div class="product__price product__skeleton-text"></div>
                  <div class="product__merchant-name product__skeleton-text"></div>
                  <div class="product__review product__skeleton-text"></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>

    <p>
      Preview based on <external-link href="https://google.com/">google.com</external-link> (Updated on {{ updatedOn }}).
    </p>
  </div>
</template>

<script>
import { computed } from 'vue';

import AppIcon from '@shared/components/app-icon';
import ExternalLink from '@shared/components/external-link';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const aggregateRatingValue = computed(() => Math.round(props.data.aggregateRatingValue));
    const aggregateReviewCount = computed(() => props.data.aggregateReviewCount);
    const description = computed(() => props.data.description);
    const image = computed(() => props.data.image);
    const isDarkMode = computed(() => props.data.theme === 'dark');
    const name = computed(() => props.data.name);
    const offerPrice = computed(() => props.data.offerPrice);
    const offerSellerName = computed(() => props.data.offerSellerName);
    const updatedOn = computed(() => props.data.updatedOn);

    const hasRequiredData = computed(() =>
      !!description.value &&
      !!image.value &&
      !!name.value &&
      !!offerPrice.value &&
      !!offerSellerName.value
    );

    const hasRating = computed(() =>
      !!aggregateRatingValue.value &&
      !!aggregateReviewCount.value
    );

    return {
      aggregateRatingValue,
      aggregateReviewCount,
      description,
      hasRating,
      hasRequiredData,
      image,
      isDarkMode,
      name,
      offerPrice,
      offerSellerName,
      updatedOn,
    };
  },

  components: {
    AppIcon,
    ExternalLink,
  },
};
</script>

<style>
@import "./css/defaults.css";
@import "./css/google.css";

/* Product */
.product {
  background-color: var(--color-white);
  border-radius: 0.5rem;
  box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
  color: var(--color-cape-cod);
  font-size: 0.75rem;
  line-height: 1.25rem;
  padding: 0.75rem 0;
  position: relative;
}

.product__review,
.product__wrapper {
  align-items: center;
  cursor: pointer;
  display: flex;
}

.product--no-hover .product__review,
.product--no-hover .product__wrapper {
  cursor: default;
}

.product__image {
  display: block;
  height: 8rem;
  margin: 0 0.875rem 0.75rem 0.75rem;
  object-fit: contain;
  object-position: center;
  width: 8.875rem;
}

.product__content {
  padding-right: 0.625rem;
  width: 100%;
}

.product__name {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-bottom: 0.125rem;
  overflow: hidden;
  word-break: break-word;
}

.product__review {
  color: rgba(0, 0, 0, 0.54);
}

.review__stars-1,
.review__stars-2,
.review__stars-3,
.review__stars-4,
.review__stars-5,
.review__stars-wrapper {
  background-image: url('./assets/google-shopping-sprites.png');
  background-repeat: no-repeat;
  background-size: 8rem;
  height: 0.688rem;
  overflow: hidden;
  text-align: left;
}

.review__stars-wrapper {
  background-position: 0 -6.625rem;
  display: inline-block;
  margin-right: 0.25rem;
  width: 3.688rem;
}

.review__stars-1,
.review__stars-2,
.review__stars-3,
.review__stars-4,
.review__stars-5 {
  background-position: -3.75rem -6.625rem;
  display: block;
}

.review__stars-1 {
  width: 0.75rem;
}

.review__stars-2 {
  width: 1.5rem;
}

.review__stars-3 {
  width: 2.25rem;
}

.review__stars-4 {
  width: 3rem;
}

.review__stars-5 {
  width: 3.75rem;
}

.product__price-wrapper {
  align-items: center;
  border-top: 1px solid var(--color-athens-dark-gray);
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  padding: 0.75rem 0.75rem 0;
}

.product__price {
  color: var(--color-shark);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.125rem;
}

.product__merchant-name {
  color: var(--color-royal-blue);
  cursor: pointer;
  font-size: 0.813rem;
  margin-left: 0.25rem;
}

.product__external-link {
  cursor: pointer;
  height: 0.875rem;
  width: 0.875rem;
}

/* Product Carrousel */
.product-carrousel {
  display: flex;
  list-style: none;
  margin-top: 1rem;
  overflow: hidden;
  padding: 0.5rem;
  width: 100%;
}

.product-carrousel__item {
  height: 20.063rem;
  margin-right: 0.5rem;
}

.product-carrousel__item:first-of-type {
  cursor: pointer;
}

.product-carrousel__item:last-of-type {
  margin-right: 0;
}

.product-carrousel .product {
  height: 100%;
  max-width: initial;
  min-width: initial;
  padding: 0.25rem;
  width: 9rem;
}

.product-carrousel .product__wrapper {
  display: initial;
}

.product-carrousel .product__image {
  height: 8.5rem;
  margin: 0;
  width: 8.5rem;
}

.product-carrousel .product__content {
  padding: 0.75rem 0.25rem 0.25rem;
}

.product-carrousel .product__name {
  -webkit-line-clamp: 4;
  color: var(--color-royal-blue);
  height: 5rem;
}

.product-carrousel .product__merchant-name {
  color: var(--color-royal-blue);
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-carrousel .product__merchant-name,
.product-carrousel .product__price {
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin: 0;
  white-space: nowrap;
}

.product-carrousel .product__price {
  color: var(--color-god-gray);
}

.product-carrousel .product__review {
  color: var(--color-oslo-gray);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

/* Skeleton UI */
.product__skeleton-image,
.product__skeleton-text {
  background-color: var(--color-gallery);
  border-radius: 3px;
  border: 1px solid var(--color-iron);
  cursor: default;
  min-height: 1.15rem;
}

.product-carrousel .product__skeleton-text {
  margin-bottom: 0.125rem;
}

.product-carrousel .product__skeleton-text:last-of-type {
  margin-bottom: 0;
}
</style>
