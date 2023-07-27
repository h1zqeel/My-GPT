import { TChat } from './Chat';

export type TSidebarProps = {elements: TChat[], allowClosage?: Boolean, ChildActionComp?: any}
export type TSidebarElement = {id: number | string, text: string, page: string, Icon?: any};
