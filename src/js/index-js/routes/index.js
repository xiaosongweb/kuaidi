import zepto from '../../lib/zepto'
import flexible from '../../lib/flexible'
import rootController from '../controllers/root'
import homeController from '../controllers/home'
import courierController from '../controllers/courier'
import moreController from '../controllers/more'
import centerController from '../controllers/center'
import footerController from '../controllers/footer'
import main_background from '../../../styles/index-css/modules/background.scss'

class Router {
    constructor() {
        rootController.init()
        footerController.init()
        this.init()
    }
    init() {
        let hash = location.hash.substr(1) || "home"
        this.controller = {
            homeController,
            courierController,
            moreController,
            centerController
        }
        this.hashRender(hash)
        this.addActive(hash)
        this.bindEvent()
    }
    bindEvent() {
        $(window).on('hashchange', this.handleHash.bind(this))
    }
    handleHash() {
        let hash = location.hash.substr(1)
        this.hashRender(hash)
        this.addActive(hash)
    }
    hashRender(hash) {
        this.controller[hash + `Controller`].init()
        if(hash==='home'){
            main_background.use()
        
            return false
        }
        main_background.unuse()
        
    }
    addActive(hash) {
        $(`.footer a[href="#${hash}"]`).addClass('active').siblings().removeClass('active')
    }
}
export default new Router()