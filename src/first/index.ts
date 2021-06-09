// 第一题
const data = [
    { userId: 8, title: 'title1' },
    { userId: 11, title: 'other' },
    { userId: 15, title: null },
    { userId: 19, title: 'title2' }
];
export const find = function (origin: any[]) {
    if (Array.isArray(origin)) {
        const newArray: any[] = []
        const data = origin.map((item) => {
            return item.title
        })
        return {
            status: true,
            where: function (val: { title: string }) {
                if (eval(val.title) instanceof RegExp) {
                    data.forEach((item, index) => {
                        if (val.title.split('').test(item)) {
                            newArray.push(origin[index])
                        }
                    })
                    return this
                }
                this.status = false
                return this
            },
            orderBy: function (name: string | number, rank: string) {
                if (this.status) {
                    return newArray.sort((a, b) => {
                        if (rank === 'desc') {
                            return b[name] - a[name]
                        }
                        return a[name] - b[name]
                    })
                }
                return 'whereh调用请选择正则表达式'

            }
        }
    }
    return 'find调用请选择数组'
}
