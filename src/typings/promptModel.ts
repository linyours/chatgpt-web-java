/**
 * 返回的实体类型
 */
export interface PromptModelResp {
	data:Array<PromptModelVo>
}

export interface PromptModelVo {
	type:string
	promptModels:Array<PromptModel>
}

// prompt的具体详情
export interface PromptModel {

	id:bigint; // id
	type:string;//类型：效率工具、生活、娱乐、学习
	title:string;//标题
	introduce:string;//简介
	demo:string;//示例
	content:string;//内容
	state:string;// 0，无效；1，有效
	sort:number;//排序值
}
