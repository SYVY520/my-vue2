<template>
  <headers>
    <h3 slot="title"><img id="left" src="@/assets/left.png" @click="left">成绩统计</h3>
    <div  v-if="nr!=='1'" style="margin-left: 300px;margin-top: 100px;font-size: 40px;color: cadetblue">
      {{nr}}
    </div>
      <div ref="chart" style="height:400px;margin-left: 10px;margin-top: 20px;"></div>
  </headers>
</template>

<script>
import axios from "axios";
export default {
  name: "tj",
  data(){
    return{
      nr:'1',
      username:'',
    }
  },
  mounted(){
    this.tj()
  },
  methods:{
    left(){
      this.$router.go(-1);
    },
      tj(){
      if(this.$route.query.identity=='teacher')
        this.username=this.$route.query.username
        else this.username=this.$route.params.id
        axios.post('/my/course/getscore',{username:this.username,coursename:this.$route.query.course}).then(res=>{
          if(res.data.status===0) {
            if(res.data.data.length===0){
              this.nr='目前还没有成绩统计哦~';
            }else{
              console.log(res.data.data.count[0].count)
              const xData=[],yData=[],yData1=[],yData2=[]
              let sum=0,sum1=res.data.data.count[0].count
              for(let i=0;i<res.data.data.results.length;i++){
                xData[i]=res.data.data.results[i].homeworknameuh
                yData[i]=res.data.data.results[i].score
                yData1[i]=res.data.data.results[i].utscore
                yData2[i]=(0.7*yData[i]+0.3*yData1[i]).toFixed(2)
                sum=sum+(0.7*yData[i]+0.3*yData1[i])/100*100/sum1
              }
              const chart = this.$refs.chart
              if (chart) {
                const myChart = this.$echarts.init(chart)
                const option = {
                  title: {
                    text: '总分:  '+(sum).toFixed(2)
                  },
                  legend: {
                    data: ['教师评分', '互评得分', '总分']
                  },
                  xAxis: {
                    data:xData
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                      data: yData,
                      name:'教师评分',
                      type: 'line',
                      emphasis:{
                        label:{
                          show:true
                        }
                      },
                      label:{
                        show:false,
                      }
                    },
                    {
                      data: yData1,
                      name:'互评得分',
                      type: 'line',
                      emphasis:{
                        label:{
                          show:true
                        }
                      },
                      label:{
                        show:false,
                      }
                    },
                    {
                      data: yData2,
                      name:'总分',
                      type: 'line',
                      label:{
                        show:true,
                      }
                    }
                  ]
                }
                myChart.setOption(option)
                window.addEventListener("resize", function() {
                  myChart.resize()
                })
              }
              this.$on('hook:destroyed',()=>{
                window.removeEventListener("resize", function() {
                  myChart.resize();
                });
              })
            }
          }
          if(res.data.status===1) console.log('读取信息失败！')
        })
      }
    }
}
</script>

<style lang="less">
@import "@/css/index.less";
</style>