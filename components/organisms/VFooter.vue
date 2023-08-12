<script setup lang="ts"></script>
<template>
    <footer class="bg-white w-full border-t mt-2">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div class="md:flex md:justify-between">
                <NuxtLink
                    href="/"
                    class="ml-4 flex justify-center overflow-hidden items-center lg:ml-0 w-36 h-36"
                    passHref
                >
                    <img src="@/assets/svg/logo.svg" />
                </NuxtLink>
                <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    <div>
                        <h2
                            class="mb-6 text-xs font-semibold text-gray-900 uppercase"
                        >
                            Thông tin
                        </h2>
                        <ul class="text-gray-600 font-medium">
                            <li class="mb-4">
                                <a href="#" class="hover:underline text-xs">
                                    Sản phẩm
                                </a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline text-xs">
                                    Địa chỉ
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2
                            class="mb-6 text-xs font-semibold text-gray-900 uppercase"
                        >
                            Kênh bán
                        </h2>
                        <ul class="text-gray-600 font-medium">
                            <li class="mb-4">
                                <a
                                    href="https://www.facebook.com/beliystores"
                                    class="hover:underline text-xs"
                                >
                                    Facebook
                                </a>
                            </li>
                            <li class="mb-4">
                                <a
                                    href="https://www.instagram.com/beliystore/"
                                    class="hover:underline text-xs"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.tiktok.com/@beliystresswear"
                                    class="hover:underline text-xs"
                                >
                                    Tiktok
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2
                            class="mb-6 text-xs font-semibold text-gray-900 uppercase"
                        >
                            Giới thiệu
                        </h2>
                        <ul class="text-gray-600 font-medium">
                            <li class="mb-4">
                                <a href="#" class="hover:underline text-xs">
                                    Pet Store
                                </a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline text-xs">
                                    Olded Store
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-between">
                <span class="text-xs text-gray-500 sm:text-center">
                    © 2023{' '}
                    <a href="/" class="hover:underline text-xs"> BeliyStore </a>
                    . All Rights Reserved.
                </span>
            </div>
        </div>
    </footer>
</template>
