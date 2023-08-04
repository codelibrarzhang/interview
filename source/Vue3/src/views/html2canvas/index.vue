<template>
    <div>
        截图区域
        <div class="canvas_box">
            <div class="dom_title">截图DOM</div>
            <div class="dom_img"><img class="dom_img_child" src="../../assets/logo.png"></div>
            
        </div>
        <div class="dom_create" @click="toImg">生成截图</div>
    </div>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
    data: function () {
        return {}
    },
    methods: {
        toImg: function () {
            var cloneNode = document.querySelector('.canvas_box')
            console.log(cloneNode)
            html2canvas(cloneNode, {
                scale: 2
            }).then(function (canvas) {
                var imgUrl = canvas.toDataURL()
                var bastUrl = imgUrl.split(",")
                console.log(imgUrl, 2222)
            })
        }
    }
}
</script>
<style scoped>
.canvas_box {
    width: 350px;
    border: 1px solid #ddd;
    margin: 0 auto;
    height: 0;
    overflow: hidden;
}
.dom_title {
    font-size: 25px;
    font-weight: 700;
}
.dom_img {
    width: 100px;
    margin: 0 auto;
}
.dom_img_child {
    width: 100%;
}
.dom_create {
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    background: #2b6722;
    border-radius: 4px;
    margin: 0 auto;
}
</style>

