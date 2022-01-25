const utils = ((ctx) => {
  return {
  	// 通过url获取文本
    async fetchText(url) {
    	return new Promise((resolve, reject) => {
    		fetch(url).then(res => {console.log(res);res.text()}).then(resolve).catch(reject)
    	})
    },
    // 通过url获取JSON
    async fetchJson(url) {
    	return new Promise((resolve, reject) => {
    		fetch(url).then(res => res.json()).then(resolve).catch(reject)
    	})
    },
    // 读取图片
    async readImage(url) {
    	return new Promise((resolve, reject) => {
    		const img = new Image()

    		img.onload = function () {
    			resolve(this)
    		}

    		img.src = url
    	})
    },
    // 解析HTML文本
    parseHtml(html) {
    	const doc = document.createElement('div')

    	doc.innerHTML = html

    	return doc.children[0]
    },
    // 解析地图数据，将一维地图转为二维数组
    parseMapData(points, width) {
        console.log('points',points)
    	const source = points.split(',')
    	const result = []
    	source.forEach((point, index) => {
    		const mod = index % Number(width)

    		if (mod === 0) {
    			result[result.length] = []
    		}

    		result[result.length - 1].push(Number(point))
    	})

    	return result
    },
    // 解析图片数据
    parseImgData: (tmx) => Array.from(tmx.querySelectorAll('tileset')).map((tileset) => ({
		firstgid: Number(tileset.getAttribute('firstgid')),
		source: (tileset.querySelector('img') || tileset.querySelector('image')).getAttribute('source')
	})),
	// 计算两点距离
	distance: (x1, y1, x2, y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)),
	// 计算两线夹角, x1, y1为起始点, x2, y2为夹角点, x3, y3为终止点
	angle(x1, y1, x2, y2, x3, y3) {
	  /* const lx1 = x1 - x2
	  const ly1 = y1 - y2
	  const lx2 = x3 - x2
	  const ly2 = y3 - y2
      const dot = lx1 * lx2 + ly1 * ly2
      const det = lx1 * ly2 - ly1 * lx2
      const angle = Math.atan2(det, dot) / Math.PI * 180
      
      return Math.round(angle + 360) % 360 */

      /* const A = {X: x1, Y: y1}
      const B = {X: x2, Y: y2}
      const C = {X: x3, Y: y3}
      const AB = this.distance(x1, y1, x2, y2)
      const AC = this.distance(x1, y1, x3, y3)
      const BC = this.distance(x2, y2, x3, y3)
      const cosA = (Math.pow(AB, 2) + Math.pow(AC, 2) - Math.pow(BC, 2)) / (2 * AB * AC);
      const angleA = Math.round( Math.acos(cosA) * 180 / Math.PI );

      return angleA */


      const diffX = x2 - x1
      const diffY = y2 - y1
      // 返回角度,不是弧度
      return 360 * Math.atan(diffY / diffX) / (2 * Math.PI)
    }
  }
})(window)