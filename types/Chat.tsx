export type TChatProps = {id: string};
export type TMessage = {id?: number, role: string, content: string};
export type TChatMessageBoxProps = { input: string, handleInputChange: any, handleSubmit: any, isLoading : boolean, allowSubmit: Boolean};
export type TChat = {id?: number, name?: string, systemMessage?: string, page: string, text?: string};