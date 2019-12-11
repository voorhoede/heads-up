<template>
  <span>{{ tooltipMessage }}</span>
</template>
<script>

function isDefined(tag) {
    const isImg = tag === 'og:image'
    return `There is no ${tag} defined. You can create the ${tag} in the <head> like <meta property="${tag}" content="${isImg?'your source':'your content'}.">`
    
}

function isTooLong(length) {
        return `The content has more than ${length} characters. Consider shorten your content.`
}

function isRequired(tag) {
        return `The ${tag} is required to create an unfurling link on the platform.`
}

// function isBigImg(tag, smallVariant, imgSize, requiredSize) {
//     if (smallVariant) {
//         return`The ${tag} is ${imgSize.width} by ${imgSize.height}px, where ${requiredSize.width} by ${requiredSize.height}px is required for a big unfurling preview`        
//     }
//     if(requiredSize.width > imgSize.width || requiredSize.height > imgSize.height){
//     return `The ${tag} sizes are too small for a preview. You need at least an image of ${requiredSize.width} by ${requiredSize.height}px`
//     }
// }

// function isCorrectUrl(tag, correct){
//    if (correct) {
//       return 
//    }
//    else{
//        return `The ${tag} URL can't be reached.`
//    }
// }

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
      default: "",
    },
    tag: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    valuelength: {
      type: Object,
      default: ()=>{},
    },
    hasVariation:{
        type: Boolean,
        default: false,
    },
    requiredSizes: {
        type: Object,
        default: ()=>{},
    },
    size:{
        type: Object,
        default: ()=>{}
    }                        
  },
 computed: {
     tooltipMessage () {
     let result = ``
     if (this.type === "og.image") {
       console.log(this);
     }
     this.required? result += isRequired(this.tag) : ''
     this.exist? '' :result += isDefined(this.type)

    if (this.valuelength !== undefined) {
        this.valuelength.tooLong? result += isTooLong(this.valueLength.max) : ''
    }

    // switch (this.tag) {
    //              case "og:description": 
    //              result += isToLong(this.content, this.maxlength)
    //              break;
    //              case "og:image":
    //             result += "og:image" 
    //              break;
    //              case "og:title":

    //              break;    
    //    }
       return result      
     },
// isDefined(tag) {
//     const isImg = tag === 'og:image'
//     return `There is no ${tag} defined. You can create the ${tag} in the <head> like <meta property="${tag}" content="${isImg?'your content':'your source'}">`
// },
// isToLong(content, length) {
//     if (content.length > length){

//     }
// },
// isRequired(tag) {
//     return `The ${tag} is required to create an unfurling link on the platform`
// },
// isBigImg(tag, smallVariant, imgSize, requiredSize) {
//     if (smallVariant) {
//         return`The ${tag} is ${imgSize.width} by ${imgSize.height}px, where ${requiredSize.width} by ${requiredSize.height}px is required for a big unfurling preview`        
//     }
//     if(requiredSize.width > imgSize.width || requiredSize.height > imgSize.height){
//     return `The ${tag} sizes are too small for a preview. You need at least an image of ${requiredSize.width} by ${requiredSize.height}px`
//     }
// },
// isCorrectUrl(tag, correctUrl){
//    if (correctUrl) {
//       return 
//    }
//    else{
//        return `The ${tag} URL can't be reached.`
//    }
// },

 }

}
</script>
<style>


</style>