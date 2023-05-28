<script setup lang="ts">
    import {reactive, onMounted} from "vue";
    import {useRouter} from "vue-router";
    import {getAideList} from '@/api/aide'
    import { PromptModel } from '@/components/common'

    const router = useRouter()

    let ArrayList = reactive({arr: []})

    onMounted(async () => {
        ArrayList.arr = await getAideList()
    })

    const toLogin = () => {
        router.push('/Login')
    }

</script>

<template>
	<div id="__next">
		<main>
			<div class="flex h-screen w-screen flex-col overflow-x-hidden bg-slate-50 text-black">
				<nav class="sticky top-0 left-0 z-10 w-full flex-none border-b border-slate-900/10 bg-white/80 backdrop-blur">
					<div class="max-w-8xl mx-auto">
						<div class="py-2 px-4">
							<div class="relative flex h-10 items-center">
								<a class="font-semibold text-black" href="/" style="display: flex; align-items: center;">
									<img
										src="@/assets/avatar.jpg"
										width="140"
										height="40"
										style="height: 3rem; width: 3rem"
										alt="icon"
									/>
									<span style="font-size: 1.5rem;color: rgb(77,78,81); letter-spacing: 0.2rem; margin-left: 1rem;">蓝猫AI助手 </span>
								</a>
								<div class="ml-auto flex">
									<button
										@click="toLogin"
										type="submit"
										class="rounded-lg px-4 py-2 text-base font-semibold disabled:cursor-not-allowed outline-none bg-black text-white plausible-event-name=LoginTrigger">
										登录/注册
									</button>
								</div>
							</div>
						</div>
					</div>
				</nav>
				<PromptModel  :visible="true" />
				<div
					class="mt-5 mx-auto cursor-pointer text-center text-sm text-gray-500"
					type="button"
					aria-haspopup="dialog"
					aria-expanded="false"
					aria-controls="radix-:Reiqm:"
					data-state="closed">
					关注公众号，第一时间了解更多玩法及更新
				</div>
				<!-- <footer class="mt-auto flex w-full justify-center py-4"></footer> -->
			</div>
		</main>
	</div>
</template>

<style></style>
