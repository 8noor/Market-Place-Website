
import { defineQuery } from "next-sanity";


export const allProducts = defineQuery(`
    *[_type == "product"] {
          _id,
          title,
          name,
          price,
          description,
          discountPercentage,
         priceWithoutDiscount,
         rating,
         size,
         tag,
         slug,
         "imageUrl": image.asset->url
        }`)

        export const fourPro = defineQuery(`
            
             *[_type == "product"] {
          _id,
          title,
          name,
          price,
          description,
          discountPercentage,
           priceWithoutDiscount,
         rating,
         size,
         tag,
         slug,
         "imageUrl": image.asset->url
            
         } `)
   
