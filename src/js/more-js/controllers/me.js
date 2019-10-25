import View from '../views/me.art'
import { log } from 'util';
class Me {
    init(session) {
        let { username } = session
     
        let html = View({
            username
        })
       
    
        
        $('main').html(html)
        this.bindEvent()
    }
    bindEvent() {
        $('.logout').on('tap', this.logout)
    }
    logout() {
        localStorage.clear('user')
        location.href='index.html#center'
    }
}
export default new Me()