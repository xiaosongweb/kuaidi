import centerView from '../views/center.art'

class InitCenter {
    init() {
        let html = centerView()
        $("main").html(html)


        this.bindEvent()
    }
    bindEvent() {
        $('.menu-list li').on('tap', function (params) {

            let className = $(this).children('.ico').attr("class")
            let hash = "more.html#" + className.split(" ")[1]

            location.href = hash
            console.log(location)
        })
    }
}
export default new InitCenter()