<template>
  <div class="google-product-desktop-preview">
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
                <a rel="noopener" target="_blank" class="product__name">{{ name }}</a>
                <div>
                  <span class="product__price">{{ offerPrice }}</span>
                  <a rel="noopener" target="_blank" class="product__merchant-name">{{ offerSellerName }}</a>
                  <a rel="noopener" target="_blank" class="product__merchant-review">
                    <span class="merchant-review__score"><strong>99%</strong> positive</span>
                    <span class="merchant-review__amount">(1.490)</span>
                  </a>
                </div>
                <a v-if="hasRating" rel="noopener" target="_blank" class="product__review">
                  <span class="review__stars-wrapper">
                    <span :class="`review__stars-${aggregateRatingValue}`"></span>
                  </span>
                  {{ aggregateReviewCount }} product reviews
                </a>
                <p class="product__description">{{ description }}</p>
              </div>
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
          <li v-for="index in 3" :key="index" class="product-carrousel__item">
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

.scroll-container__inner {
  min-width: 40rem;
}

/* Product */
.product {
  background-color: var(--color-white);
  border-radius: 0.5rem;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
  padding: 0.75rem;
}

.product--no-hover {
  cursor: default;
}

.product__image,
.product__merchant-name,
.product__merchant-review,
.product__name,
.product__review {
  cursor: pointer;
}

.product__merchant-name:hover,
.product__merchant-review:hover,
.product__name:hover,
.product__review:hover,
.product-carrousel__item:hover .product__name {
  text-decoration: underline;
}

.product__image {
  display: block;
  height: 11.25rem;
  margin: 0.75rem 0.75rem 0.75rem 0;
  object-fit: contain;
  object-position: center;
  width: 11.25rem;
}

.product__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.75rem;
  width: 100%;
}

.product__merchant-name,
.product__merchant-review,
.product__price {
  line-height: 1.75rem;
  margin-right: 0.375rem;
}

.product__name {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: var(--color-shuttle-gray);
  display: -webkit-box;
  font-size: 1.25rem;
  line-height: 1.3;
  margin-bottom: 0.375rem;
  overflow: hidden;
}

.product__price {
  color: var(--color-mine-shaft);
  font-size: 1.125rem;
  font-weight: 700;
}

.product__description,
.product__merchant-name,
.product__merchant-review,
.product__review {
  font-size: 0.875rem;
}

.product__description {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  overflow: hidden;
}

.product__merchant-name {
  color: var(--color-royal-blue);
}

.product__merchant-review {
  color: var(--color-boulder);
  white-space: nowrap;
}

.merchant-review__score {
  color: var(--color-la-palma);
}

.product__description,
.product__review {
  color: var(--color-shuttle-gray);
  line-height: 1.125rem;
  margin-top: 0.375rem;
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
  margin-right: 0.3125rem;
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

.product__wrapper,
.product__review {
  align-items: center;
  display: flex;
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
  cursor: pointer;
  height: 23.875rem;
  margin-right: 0.5rem;
}

.product-carrousel__item:last-of-type {
  margin-right: 0;
}

.product-carrousel .product__merchant-name:hover,
.product-carrousel .product__review:hover {
  text-decoration: none;
}

.product-carrousel .product {
  height: 100%;
  max-width: initial;
  min-width: initial;
  padding: 0.25rem;
  width: 10.5rem;
}

.product-carrousel .product__wrapper {
  display: initial;
}

.product-carrousel .product__image {
  height: 10rem;
  width: 10rem;
}

.product-carrousel .product__content {
  padding: 0.75rem 0.5rem 0.5rem;
}

.product-carrousel .product__name {
  -webkit-line-clamp: 3;
  color: var(--color-royal-blue);
  font-size: 1rem;
  height: 4.125rem;
  line-height: 1.375rem;
  margin-bottom: 0.25rem;
}

.product-carrousel .product__merchant-name {
  -webkit-line-clamp: initial;
  color: var(--color-royal-blue);
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-carrousel .product__merchant-name,
.product-carrousel .product__price {
  display: block;
  font-size: 1rem;
  line-height: 1.375rem;
  margin-right: 0;
  white-space: nowrap;
}

.product-carrousel .product__price {
  color: var(--color-god-gray);
  margin-bottom: 0.25rem;
}

.product-carrousel .product__description,
.product-carrousel .product__review {
  color: var(--color-oslo-gray);
  font-size: 1rem;
  line-height: 1.375rem;
  margin-top: 0.25rem;
}

/* Skeleton UI */
.product__skeleton-image,
.product__skeleton-text {
  background-color: var(--color-gallery);
  border-radius: 3px;
  border: 1px solid var(--color-iron);
  cursor: default;
  min-height: 1.375rem;
}
</style>
