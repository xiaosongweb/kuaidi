import zepto from '../../lib/zepto'
import flexible from '../../lib/flexible'
import rootController from '../controllers/root'
import homeController from '../controllers/home'
import courierController from '../controllers/courier'
import moreController from '../controllers/more'
import centerController from '../controllers/center'
import footerController from '../controllers/footer'
import main_background from '../../../styles/index-css/modules/background.scss'
import routes from './config/config_route'

class Router {
    constructor() {
        rootController.init()
        footerController.init()
        this.init()
    }
    init() {
        $(window).on('load', this.handlePageload.bind(this))
        $(window).on('hashchange', this.handleHash.bind(this))
    }
    renderDOM(hash) {
        let controller = {
            homeController,
            courierController,
            moreController,
            centerController
        }
        controller[hash + 'Controller'].init()
        if (hash === 'home') {
            main_background.use()
            return false
        }
        main_background.unuse()
    }

    handleHash() {
        let hash = location.hash.substr(1)
        let reg = new RegExp('^(\\w+)', 'g')
        let path = reg.exec(hash)
        this.renderDOM(path[1])
        this.addActive(path[1])
    }
    handlePageload() {
        let hash = location.hash.substr(1) || 'home'
        let reg = new RegExp('^(\\w+)', 'g')
        let path = reg.exec(hash)
        location.hash = hash
        this.renderDOM(path[1])
        this.addActive(path[1])
    }

    addActive(hash) {
        $(`.footer a[href="#${hash}"]`).addClass('active').siblings().removeClass('active')
    }
}
export default new Router()