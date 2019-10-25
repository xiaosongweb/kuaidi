import zepto from '../../lib/zepto'
import flexible from '../../lib/flexible'
import rootController from '../controllers/root'
import headerController from '../controllers/header'
import loginController from '../controllers/login'
import regController from '../controllers/register'
class Router {
    constructor() {
        rootController.init()
        headerController.init()
   
        this.init()
    }
    init() {
        $(window).on('load', this.handlePageload.bind(this))
        $(window).on('hashchange', this.handleHash.bind(this))
    }
    renderDOM(hash) {
        let controller = {
            loginController,
            regController
            // loginController
            // registerController
        }
        controller[hash + 'Controller'].init()

    }

    handleHash() {
        let hash = location.hash.substr(1)
        let reg = new RegExp('^(\\w+)', 'g')
        let path = reg.exec(hash)
        this.renderDOM(path[1])

    }
    handlePageload() {
        let hash = location.hash.substr(1) || 'login'
        let reg = new RegExp('^(\\w+)', 'g')
        let path = reg.exec(hash)
        location.hash = hash
        this.renderDOM(path[1])

    }


}
export default new Router()