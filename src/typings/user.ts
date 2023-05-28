
export interface ModelType {
	password: string
	account: string
}

export interface UserInfo {
	id:bigint;// 用户id
	username:string; //用户昵称
	avatar:string; // 用户头像
	account:string; //用户账号
	status:number; // 账号状态 0正常 1：禁止登录
	userLevel:string;//用户等级
	/**
	 * 用户模型访问规则配置
	 * key: 模型标识
	 * value: 相应模型的规则
	 */
	userLevelAccessVoMap:Map<String,UserLevelAccess>;
}

export interface UserLevelAccess {
	id:number;//主键id
	useNumber:number;//访问次数
	serviceType:string;//模型标识
	startEffectiveTime:string;//开始生效时间
	endEffectiveTime:string;//有效结束时间
}

