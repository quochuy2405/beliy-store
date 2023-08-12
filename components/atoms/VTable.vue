<script setup lang="ts">
import {
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useVueTable,
} from '@tanstack/vue-table'
interface Props {
    data: any
    columns: any
}

const { data, columns } = withDefaults(defineProps<Props>(), {})
const table = useVueTable({
    get data() {
        return data.value
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
})
</script>

<template>
    <div class="p-2">
        <table
            class="w-full text-sm text-left text-gray-500 rounded-lg top-0 sticky overflow-scroll"
        >
            <thead
                class="text-xs text-gray-400 uppercase bg-gray-100 sticky top-0"
            >
                <tr
                    v-for="headerGroup in table.getHeaderGroups()"
                    :key="headerGroup.id"
                    class="mr-6"
                >
                    <th
                        v-for="header in headerGroup.headers"
                        :key="header.id"
                        :colSpan="header.colSpan"
                        class="first:pl-6 last:pr-6 h-12 pl-1"
                        :class="{
                            'text-center': (header.column.columnDef.meta as any)
                                ?.center,
                        }"
                    >
                        <FlexRender
                            v-if="!header.isPlaceholder"
                            :render="header.column.columnDef.header"
                            :props="header.getContext()"
                        />
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y-[1px] h-fit">
                <tr v-for="row in table.getRowModel().rows" :key="row.id">
                    <td
                        class="first:pl-6 last:pr-6 h-12 pl-1 font-medium text-sm text-black"
                        v-for="cell in row.getVisibleCells()"
                        :key="cell.id"
                    >
                        <FlexRender
                            :render="cell.column.columnDef.cell"
                            :props="cell.getContext()"
                        />
                    </td>
                </tr>
                <tr>
                    <td
                        v-if="!table?.getRowModel().rows.length"
                        :colspan="table.getHeaderGroups()[0].headers.length"
                        className="px-6 py-3 h-full text-center w-full"
                    >
                        Không tìm thấy kết quả nào.
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr
                    v-for="footerGroup in table.getFooterGroups()"
                    :key="footerGroup.id"
                >
                    <th
                        v-for="header in footerGroup.headers"
                        :key="header.id"
                        :colSpan="header.colSpan"
                    >
                        <FlexRender
                            v-if="!header.isPlaceholder"
                            :render="header.column.columnDef.footer"
                            :props="header.getContext()"
                        />
                    </th>
                </tr>
            </tfoot>
        </table>
    </div>
</template>
