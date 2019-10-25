import zepto from '../../lib/zepto'
import flexible from '../../lib/flexible'
import { serialize } from '../../lib/tools'
import rootController from '../controllers/root'
import headerController from '../controllers/header'
import menuListController from '../controllers/menuList'
import controller from './config/route'

class Router {
    constructor() {
        let hash = location.hash.substr(1)
        rootController.init()
        headerController.init(serialize(hash))
        menuListController.init()
        this.init()
        

    }
    hasLogin() {
        if (!localStorage.getItem('user')) {
            return false
        }
        let { username, token } = JSON.parse(localStorage.getItem('user'))
        $.ajax({
            url: '/checkUser',
            type: 'POST',
            data: {
                username: username,
                token: token
            },
            success: function (res) {
                if (res.code === 3) {
                    localStorage.clear('user')
                }
            }
        })
    }

    init() {
        $(window).on('load', this.handlePageload.bind(this))
        $(window).on('hashchange', this.handleHash.bind(this))
    }
    renderDOM(hash) {
        this.hasLogin()
        let session = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
        controller[hash + 'Controller'].init(session)
    }
    handleHash() {
        let hash = location.hash.substr(1)
        let reg = new RegExp('^(\\w+)', 'g')
        let path = reg.exec(hash)
        this.renderDOM(path[1])
        headerController.init(serialize(path[1]))
    }
    handlePageload() {
        let hash = location.hash.substr(1) || 'price'
        let reg = new RegExp('^(\\w+)', 'g')
        let path = reg.exec(hash)
        location.hash = hash
        this.renderDOM(path[1])
    }

}
export default new Router()