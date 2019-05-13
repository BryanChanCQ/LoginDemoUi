const rmParent = (obj) => {
  if (obj.parent) {
    // obj.parent = undefined
    // obj.parentId = obj.parent.id
    delete obj.parent
  }
  Object.keys(obj).forEach(element => {
    if (element.startsWith('_')) {
      delete obj[element]
    }
  })
  // obj.path = obj.url
  // delete obj.parentName
  // obj.id = obj.name
  // obj.meta = {
  //   title: obj.title,
  //   icon: obj.icon,
  //   perms: obj.perms,
  //   type: obj.type
  // }
  if (obj.children) {
    // hack写法，不能直接更改children的属性值，否则会影响到原始对象，只能整体替换掉
    const nchld = []
    obj.children.forEach(element => {
      const cobj = Object.assign({}, element)
      rmParent(cobj)
      nchld.push(cobj)
    })
    obj.children = nchld
  }
}

export default rmParent
