<template>
  <div>
      <div class="videoPart">
          <video height="100%" width="100%" controls autoplay muted id='video1'></video>
      </div>
      <div class="videoPart">
        <video height="100%" width="100%" controls autoplay muted id="otherVideo"></video>
      </div>
      <button @click='toGet'>接听</button>
      <br/>
      <input placeholder="请输入姓名" type="text" v-model="name">
      <br/>
      <button @click="toCopy">复制</button>
      <br/>
      <input placeholder="请输入要拨打对象的id" type="text" v-model="customId">
      <br/>
      <button @click="toCall(customId)">拨号</button>
      <button @click="toleave">结束通话</button>
  </div>
</template>

<script>
import Peer from 'simple-peer'
import io from 'socket.io-client'
export default {
  data() {
    return {
        name:'',
        customId:'',
        message:'sdsdsds',
        stream:null,
        socket:null,
        currPeer:null
    };
  },
  methods: {
    //
    toleave(){
      console.log('结束通话')
      // this.currPeer.current.destroy()
      this.shouPeer.current.destroy()
    },
    // 去拨号
    toCall(idTocall){
      console.log('发送方',idTocall)
      // 实例化对等连接对象
      const peer = new Peer({
        initiator:true,
        stream:this.stream,
        trickle:false
      })
      //  传递信令数据
      peer.on('signal',data=>{
        this.socket.emit('callUser',{
          userToCall:idTocall,
          signalData:data,
          from:this.message,
          name:this.name
        })
      })
      //  获取对方的stream
      peer.on('stream',(stream)=>{
        console.log("shipingliu",stream)
        document.getElementById('otherVideo').srcObject = stream
      })
      //  当接听方同意去接听
      this.socket.on('callAccepted',signal=>{
        // 修改成已接听
        peer.signal(signal)
      })
      // 保存当前peer
      this.currPeer = peer
    },
    // 去接听
      toGet(){
        const peer = new Peer({
          initiator:false,
          stream:this.stream,
          trickle:false,
        })
        peer.on('signal',data=>{
          console.log('应答',data,this.fromId)
          this.socket.emit('answerCall',{
            signalData:data,
            to:this.fromId
          })
        })
        // 
        peer.on('stream',stream=>{
          document.getElementById('otherVideo').srcObject = stream
        })
        // 
        peer.signal(this.callSignal)
        this.shouPeer = peer
      },
      toCopy(){
          this.$copyText(this.message).then(res=>{
              console.log('成功',res)
          }).catch(err=>{
              console.log('失败',err)
          })
      }
  },
  created() {
  },
  mounted(){
    // 客户端socket连接
    const socket = io.connect('http://localhost:5001')
    // 保存socket
    this.socket = socket
    socket.on('me',(id)=>{
      // 保存id
      this.message = id
    })
    // 获取媒体流
    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>{
      // 保存视频流
      this.stream = stream
      document.getElementById('video1').srcObject = stream
    })
    
    // 接听方获取从服务器获取的从发送方获取的发送方数据
    socket.on('callUser',data=>{
      console.log('接听发',data)
      // 接听键开始显示，知道是谁来点
      this.fromId = data.from
      this.callSignal = data.signal
    })
  }
};
</script>

<style lang="css" scoped>
.videoPart{
    height: 250px;
    width: 500px;
    background: black;
    margin-bottom: 50px;
}
</style>