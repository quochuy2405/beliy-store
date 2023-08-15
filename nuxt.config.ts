// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['@/assets/css/main.css'],
    modules: ['nuxt-icon', '@pinia/nuxt'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    app: {
        pageTransition: {
            name: 'page',
            mode: 'default', // default
        },
        layoutTransition: {
            name: 'layout',
            mode: 'default', // default
        },
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Beliy Stresswear',
            meta: [
                {
                    name: 'keywords',
                    content:
                        'Thời trang hàng đầu,Thời trang đẳng cấp,Thời trang phong cách,Áo quần nam nữ,Bộ sưu tập mới,Phong cách độc đáo, localbrand,Localbrand,Beliy,Stress,StressWear, stresswear, beliyclothing, beliy stresswear,beliystresswear, beliy localbrand, beliy style ',
                },
                {
                    key: 'meta-description',
                    name: 'description',
                    content:
                        'Beliy StressWear là cửa hàng thời trang hàng đầu về những mẫu giới hạn cùng với thiết kế đẳng cấp ,chất lượng cao và phong cách độc đáo.',
                },
                {
                    key: 'meta-og:type',
                    property: 'og:type',
                    content: 'website',
                },
                {
                    key: 'meta-og:url',
                    property: 'og:url',
                    content: 'https://www.beliystresswear.com/',
                },
                {
                    key: 'meta-og:title',
                    property: 'og:title',
                    content: 'Beliy Stresswear - Limited Edition Clothings',
                },
                {
                    key: 'meta-og:description',
                    property: 'og:description',
                    content:
                        'Beliy StressWear là cửa hàng thời trang hàng đầu về những mẫu giới hạn cùng với thiết kế đẳng cấp ,chất lượng cao và phong cách độc đáo.',
                },
                {
                    key: 'meta-og:image',
                    property: 'og:image',
                    content: '/img/JACKET3-2.png',
                },
                {
                    key: 'meta-twitter:title',
                    property: 'twitter:title',
                    content: 'Beliy Stresswear - Limited Edition Clothings',
                },
                {
                    key: 'meta-twitter:description',
                    property: 'twitter:description',
                    content:
                        'Beliy StressWear là cửa hàng thời trang hàng đầu về những mẫu giới hạn cùng với thiết kế đẳng cấp ,chất lượng cao và phong cách độc đáo.',
                },
                {
                    key: 'meta-twitter:image',
                    property: 'twitter:image',
                    content: '/img/JACKET3-2.png',
                },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/logo.svg' },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Didact+Gothic&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
                },
            ],
        },
    },
})
