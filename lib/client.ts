import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: '9gobbmto',
    dataset: 'production',
    apiVersion: '2022-09-01',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder = imageUrlBuilder(client);

export const urlFor:any = (source:any) => builder.image(source);