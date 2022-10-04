<template>
  <div id="app" v-if="this.lines?.length === 5">
    <div id="title">纳新面试等候板</div>
    <stars/>
    <card v-for="index in [0, 1, 2, 3, 4]" :key="index" :id="`card${index+1}`" :department="index" :line="lines[index]" />
    <div id="footer">SENDS STUDIO</div>
    <img :src="sends">
  </div>
</template>

<script>
import stars from "./components/star.vue"
import card from "./components/card.vue"
import { login, line } from './api'
import sends from './assets/sends.svg'

export default {
  name: 'App',
  components: {
    stars,
    card
  },
  data(){
    return{
      lines:[
        
      ],
      sends
    }
  },
  async created(){
    const res = await login()
    localStorage.setItem('token', res.data.data)
    const departments = ['软件部', '运维部', '美工部', '策划部', '运营部']
    this.lines = await Promise.all(departments.map( async(e) => {
      let eachLine = await line(e)
      if(eachLine.data.data){
        return eachLine.data.data.filter(e => e.state != 'finished')
      }else {
        return []
      }
    }))
    setInterval(async() => {
      let tempLines = await Promise.all(departments.map( async(e) => {
        let eachLine = await line(e)
        if(eachLine.data.data){
          return eachLine.data.data.filter(e => e.state != 'finished')
        }else {
          return []
        }
      }))
      console.log(tempLines)
      for(let i = 0; i < 5; i++){
        if(JSON.stringify(tempLines[i]) !== JSON.stringify(this.lines[i])){
          this.lines[i] = [...tempLines[i]]
          this.$forceUpdate()
        }
      }
    }, 5000);
  }
}
</script>

<style lang="less">
  @font-face {
    font-family: FZLaGBTTJW_Xi;
    src: url('./assets/FZLaGBTTJW_Xi.TTF');
  }
  @font-face {
    font-family: FZYongKTJ;
    src: url('./assets/FZYongKTJ.TTF');
  }
  * {
    font-family: FZLaGBTTJW_Xi;
  }
  img {
    width: 35vw;
    height: 35vw;
    position: absolute;
    left: 50vw;
    top: 50vh;
    transform: translate(-50%, -50%);
    opacity: 0.4;
    z-index: -1000;
  }
  #title {
    font-family: FZYongKTJ;
    font-size: 9vh;
    color: white;
    position: absolute;
    top: 16vh;
    right: 50vw;
    transform: translate(50%, 0);
  }
  #card1 {
    position: absolute;
    top: 7vh;
    left: 3vw;
  }
  #card2 {
    position: absolute;
    top: 7vh;
    right: 3vw;
  }
  #card3 {
    position: absolute;
    bottom: 8vh;
    left: 3vw;
  }
  #card4 {
    position: absolute;
    bottom: 20vh;
    left: 35vw;
  }
  #card5 {
    position: absolute;
    bottom: 8vh;
    right: 3vw;
  }
  #footer {
    font-family: FZYongKTJ;
    font-size: 6vh;
    color: white;
    position: absolute;
    bottom: 8vh;
    right: 50vw;
    transform: translate(50%, 0);
  }
</style>
