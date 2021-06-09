// 首次加载数据处理
 export interface Children {
    id:number;
    name:string;
}

export interface Data {
    groupId: string;
    groupName: string;
    children?: Children[]

}
export const disposalData = (data: any[]) => {
    const newArray: any = []
    const lop = (data: any[]) => {
        data.forEach(item => {
            if (item.children?.length) {
                lop(item.children)
                newArray.push(...item.children)
            }
        })
    }
    lop(data)
    return newArray
}
export const getUID = () => { // 获取唯一值
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

