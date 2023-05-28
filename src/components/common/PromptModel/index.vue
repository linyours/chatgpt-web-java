<script setup lang='ts'>
import { reactive, onMounted,computed } from "vue";
import { getAideList } from '@/api/aide'
import { PromptModel } from '@/typings/promptModel'
import { NModal, NTabPane, NTabs,useMessage } from 'naive-ui'
let ArrayList = reactive({arr:[]})

onMounted(async () => {
	ArrayList.arr = await getAideList()
})
interface Props {
    visible: boolean
}
const emit = defineEmits<Emit>()
interface Emit {
    (e: 'update:visible', visible: boolean): void
}
const props = defineProps<Props>()

const show = computed({
    get() {
        return props.visible
    },
    set(visible: boolean) {
        emit('update:visible', visible)
    },
})
const toDetails = (item: any) => {
    // router.push({
    // 		path: '/aide/detail',
    // 		query: item})
    window.open(`#/aide/detail?id=${item.id}&demo=${item.demo}&title=${item.title}&introduce=${item.introduce}`, '_blank')
}
</script>

<template>
<!--	<NModal v-model:show="show" :auto-focus="true" preset="card" style="width: 95%; max-width: 1640px">-->
	<div v-if="show" class="container mx-auto pb-10 pt-4">
		<div class="flex w-full flex-col gap-y-4" v-for="arr in ArrayList.arr" :key="arr.type">
			<div class="flex flex-col gap-y-4 p-4">
				<div style="color: #999999" class="text-lg font-semibold text-black">{{ arr.type }}</div>
				<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
					<a v-for="item in arr.promptModels" :key="item.id" @click.prevent="toDetails(item)">
						<div class="rounded-lg bg-white shadow-xl shadow-black/5 ring-1 ring-slate-700/10 h-full plausible-event-name=Tool+praise">
							<div class="group flex flex-col p-4">
								<div  class="flex items-center gap-2">
												<span  class="text-lg font-semibold text-black">{{ item.title }}</span >
								</div>
								<span class="mt-4 text-sm text-gray-500"> {{ item.introduce }} </span>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
<!--	</NModal>-->
</template>

<style scoped>

</style>
