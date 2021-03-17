import tippy from 'tippy.js'

const defaultParams = {
  placement: 'bottom',
}

function tippyWrapper(node, params) {
  const instance = tippy(node, { ...defaultParams, ...params })
  return {
    update(newParams) {
      instance.setProps(newParams)
    },
    destroy() {
      instance.destroy()
    },
  }
}

export default tippyWrapper
