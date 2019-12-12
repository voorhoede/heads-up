<template>
  <span>{{ tooltipMessage }}</span>
</template>
<script>

function isDefined(tag) {
  const isImg = tag === 'og:image'
  return `There is no ${tag} defined. You can create the ${tag} in the <head> like <meta property="${tag}" content="${isImg?'your source':'your content'}."> `
}

function isTooLong(length) {
  return `The content has more than ${length} characters. Consider shorten your content. `
}

function isRequired(tag) {
  return `The ${tag} is required to create an unfurling link on the platform. `
}

function isBigImg(tag, smallVariant, imgSize, requiredSize) {
  if (smallVariant) {
    return`The ${tag} is ${imgSize.width} by ${imgSize.height}px, where ${requiredSize.width} by ${requiredSize.height}px is required for a big unfurling preview. `
  }
  
  if (requiredSize.minimum.width > imgSize.width || requiredSize.minimum.height > imgSize.height){
    return `The ${tag} sizes are too small for a preview. You need at least an image of ${requiredSize.minimum.width} by ${requiredSize.minimum.height}px. `
  }
  
  return ""
}

function isCorrectUrl(tag, correct){
   if (correct) {
      return ""
   }
   
  return `The ${tag} URL can't be reached. `
}

export default {
  props: {  
    exist: {
      type: Boolean,
      default: true,
    },    
    required: {
      type: Boolean,
      default: false,
    },    
    type: {
      type: String,
      default: null,
    },
    tag: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
    valueLength: {
      type: Object,
      default: () => ({ })
    },
    hasVariation:{
      type: Boolean,
      default: false,
    },
    requiredSizes: {
      type: Object,
      default: () => ({ })
    },
    size: {
      type: Object,
      default: () => ({ })
    },
  },
 computed: {
     tooltipMessage () {
      let result = ``

      this.required ? result += isRequired(this.tag) : ''
      this.exist ? '' : result += isDefined(this.type) 

      if (this.valueLength !== undefined) {
          this.valueLength.tooLong ? result += isTooLong(this.valueLength.max) : ''
      }

      if (this.type === "og:image") {  
        result += isCorrectUrl(this.type, this.exist)
        result += isBigImg(this.type, this.hasVariation, this.size, this.requiredSizes)
      }

      if (result.length === 0) {
        result += `The ${this.type} tag is perfectly implemented. `
      }

      return result
    },
  }
}
</script>