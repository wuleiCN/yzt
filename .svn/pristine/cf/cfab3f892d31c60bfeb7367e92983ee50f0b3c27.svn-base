import Vue from 'vue'
import store from '../store'
/**
 * @export 自定义指令
 */
export function directive() {
  // console.log(store.getters, 'www')
  Vue.directive('focus', {
    inserted: function(el) {
      el.focus()
    }
  })
  Vue.directive('permit', {
    inserted(el, binding) {
      if (!store.getters.roleList.includes(binding.value)) {
        el.parentNode.removeChild(el)
      }
    }
  })
  Vue.directive('resize', {
    bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
      let width = ''
      let height = ''
      function isReize() {
        const style = document.defaultView.getComputedStyle(el)
        if (width !== style.width || height !== style.height) {
          binding.value(style.width, style.height)
        }
        width = style.width
        height = style.height
      }
      el.__vueSetInterval__ = setInterval(isReize, 300)
    },
    unbind(el) {
      clearInterval(el.__vueSetInterval__)
    }
  })
}
