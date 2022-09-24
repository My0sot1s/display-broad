<template>
  <div class="card" :style="{'--bgc': `inset 0 0 0 20vw ${settings[department].bgc}`}">
    <div id="b1">{{settings[department].name}}</div>
    <div id="b2">
      <div>等候人数</div>
      <div class="large animate__animated animate__flash" v-show="show">{{line.length >= 1? line.length-1 : 0}}</div>
    </div>
    <div id="b3">
      <div id="status">
        <div class="small">状态</div>
        <div class="large">面试中</div>
      </div>
      <div id="member">
        <div class="small">当前成员</div>
        <div class="large animate__animated animate__flash" v-show="show" v-if="line.length > 0">{{line[0].stuName}}</div>
      </div>
    </div>
    <div id="b4">
      <div>等候列表</div>
      <div class="large animate__animated  animate__fadeInUp" v-if="line.length > 1" v-show="show">1. {{line[1].stuName}}</div>
      <div class="large animate__animated  animate__fadeInUp" v-if="line.length > 2" v-show="show">2. {{line[2].stuName}}</div>
      <div class="large animate__animated  animate__fadeInUp" v-if="line.length > 3" v-show="show">3. {{line[3].stuName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      settings:[
        {
          name: '软 件',
          bgc: 'rgba(166, 198, 247, 1)'
        },
        {
          name: '运 维',
          bgc: 'rgba(133, 214, 215, 1)'
        },
        {
          name: '美 工',
          bgc: 'rgba(218, 199, 218, 1)'
        },
        {
          name: '策 划',
          bgc: 'rgba(217, 199, 187, 1)'
        },
        {
          name: '运 营',
          bgc: 'rgba(128, 220, 245, 1)'
        },
      ],
      show: true
    }
  },
  props:['department', 'line'],
  watch: {
    line(newVal, oldVal){
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 67)
    }
  },
  mounted(){
    
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  .card {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    width: 30vw;
    height: 40vh;
    padding: 2vw;
    text-align: center;
    position: relative;
    z-index: 100;
    background: inherit;
    border-radius: 1.5vw;
    overflow: hidden;
  }
  .card > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
  }
  .card::before{
    content: "";
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    background: inherit;
    box-shadow: var(--bgc);
    position: absolute;
    top: -10px;
    left: -10px;
    z-index: -1;
    filter: blur(100px);
    overflow: hidden;
  }
  #b1 {
    font-size: 10vh;
  }
  #b3 {
    justify-content: space-around;
  }
  .large {
    font-size: 4vh;
  }
  .small {
    flex-grow: 2vh;
  }
</style>