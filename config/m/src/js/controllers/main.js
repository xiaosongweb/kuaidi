const BScroll = require("../libs/better-srcoll-1.15.2");
const modelsData = require("../models/getData");
const main = require("../views/main.art");
const mainDate = require("../views/mainData.art")
const { randomPage } = require("../utils/utils");
class Main {
    constructor() {
    }
    async init() {
        this.pageNo = 1
        this.pageSize = 15
        this.totalCount = 0
        this.main = $("main")
        this.res = (await this.getData({}))
        this.isFirst = true
        this.result = []
        this.renderMain()
        this.renderList()
        this.openScroll()
        this.bindEvent()
    }
    getData({ no, size }) {
        let pageNo = no ? no : this.pageNo
        let pageSize = size ? size : this.pageSize
        return modelsData.get({ pageNo, pageSize })
    }
    renderMain() {
        let mainHtml = main()
        this.main.html(mainHtml)
    }
    renderList(res) {
        let result = res ? res : this.res.content.data.page.result
        let ulHtml = mainDate({
            result: result
        })
        $(".main ul").html(ulHtml)
    }
    bindEvent() {
        this.bscroll.on("pullingUp", this.pulling.bind(this, "up"))
        this.bscroll.on("pullingDown", this.pulling.bind(this, "down"))
    }
    openScroll() {
        this.bscroll = new BScroll("main", {
            probeType: 2,
            pullDownRefresh: {
                threshold: 40,
                stop: 0
            },
            pullUpLoad: {
                threshold: 80
            }
        });
        this.bscroll.scrollBy(0, -40)
    }
    async  pulling(type) {
        if (type === "down") {
            let no = randomPage().pageNo
            let size = randomPage().pageSize
            let { result: lastData } = this.res.content.data.page
            let { result: nowData } = (await this.getData({ no, size })).content.data.page
            let result = this.result = this.isFirst ? [...nowData, ...lastData, ...this.result] : [...nowData, ...this.result]
            this.renderList(result)
            this.isFirst = false
            this.bscroll.finishPullDown()
        } else if (type === "up") {
            this.pageNo++
            let no = this.pageNo
            let { result: lastData } = this.res.content.data.page
            let { result: nowData } = (await this.getData({ no })).content.data.page
            let result = this.result = this.isFirst ? [...nowData, ...lastData, ...this.result] : [...nowData, ...this.result]
            this.renderList(result)
            this.bscroll.finishPullUp()
        }
    }
}
new Main().init()



