<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { NaiveProvider } from '@/components/common'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const { theme, themeOverrides } = useTheme()
const { language } = useLanguage()
const { isMobile } = useBasicLayout()
function getStyle() {
		if(isMobile){
		    return "position:absolute;top:110%;text-align:center;bottom:0;margin:0 auto;width:100%;color: #5c6b77"
		}
		return "position:absolute;top:100%;text-align:center;bottom:0;margin:0 auto;width:100%;color: #5c6b77"
}

</script>

<template>
  <NConfigProvider
    class="h-full"
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="language"
  >
    <NaiveProvider>
      <RouterView />
<!--			暂时去掉下方备案-->
			<div v-if="false"
				style="position:absolute;top:100%;text-align:center;bottom:0;margin:0 auto;width:100%;color: #999999"
			>
				<br v-if="isMobile">
				<br v-if="isMobile">
				<img src='http://cdn.beiruijk.com/0be25a8d779aee40433aaca76c5f6ce.jpg' style="display: inline-block; vertical-align: middle;"/>
				<a
					target="_blank"
					style="color: #999999;font-size: 14px; display: inline-block; vertical-align: middle;"
					href="https://beian.miit.gov.cn/"
				> &nbsp;湘ICP备2021013567号-1</a>
				<span style="color: #999999;font-size: 14px">&nbsp; @2023 蓝猫AI工作室</span>
			</div>
    </NaiveProvider>
  </NConfigProvider>
</template>
