<template>
    <div>
        <video id="videoElement"></video>
        <button @click="toLoad">加载流</button>
        <button @click="toStart">开始播放</button>
        <button @click="flvPlayer.pause()">暂停</button>
        <button @click="flvPlayer.unload()">停止加载流</button>
        <button @click="flvPlayer.destroy()">销毁视频</button>
    </div>
</template>

<script>
  import flvjs from 'flv.js'
  export default {
    name: "flv_test",
    methods:{
      toLoad(){
        if (flvjs.isSupported()) {
          var videoElement = document.getElementById('videoElement');
          this.flvPlayer = flvjs.createPlayer({
            hasAudio:false,
            isLive:true,
            type: 'flv',
            cors:true,
            url: 'ws://127.0.0.1:8888/rtsp/id123?url=rtsp://admin:123456@192.168.1.188:554/h264/ch1/main/av_stream'
          });
          this.flvPlayer.attachMediaElement(videoElement);
        }
        this.flvPlayer.load();
      },
      toStart(){
        console.log(this.flvPlayer)
        this.flvPlayer.play();
      },
    },
    mounted(){
      this.toLoad()
    },
    beforeDestroy() {
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>