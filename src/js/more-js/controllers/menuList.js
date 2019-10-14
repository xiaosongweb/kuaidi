
import menuListView from '../views/menu-list.art'
class InitMenuList {
    init() {
        let html = menuListView();
        $('#menu-list').html(html)
        this.bindEvent()
    }
    bindEvent() {
        $(".common-menu").on('tap', this.showMenuList)
        $('.common-menu-list').on('tap', this.hideMenuList)
    }
    showMenuList() {
        $('.common-menu-list').show()
    }
    hideMenuList() {
        $('.common-menu-list').hide()
    }
}
export default new InitMenuList()