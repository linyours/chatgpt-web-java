

export interface ImageReq {
	authToken: string;
	modelId: string;
	negativePrompt: string;
	prompt: string;
	modelIsPublic?: number;
	width?: number;
	height?: number;
	imageNum?: number;
}

export interface drawImageRes {
	authToken:string;
	taskIds:Array<string>;
}
