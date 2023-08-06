<template>
    <button @click="$emit('onClick')"
        class="block text-white m-2 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">
        <slot></slot>
    </button>
</template>