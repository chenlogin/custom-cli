<template>
  <div class="main">
    <div class="heading">
      <div class="region">
        <HelloWorld msg="欢迎使用 CM 脚手架!" />
        <p class="subtitle">快速搭建前端项目的脚手架工具</p>
        <p class="subtitle">
          <%_ if(mobile) { _%>
          <tag type="primary">VantUI</tag>
          <%_ } else { _%>
          <el-tag>Element Plus</el-tag>
          <%_ } _%>
        </p>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <p class="desc">MPA项目</p>
        <p class="desc sm">Vue3 + TypeScript + Vite</p>
      </div>
      <div class="right">
        <div class="link">
          <a href="../projectB/pageB.html" target="_blank">Go To PageB</a>
        </div>
        <div class="link">
          <a href="../projectB/pageC.html" target="_blank">Go To PageC</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { getPaperInfo } from './api/demoApi'
<%_ if(mobile) { _%>
import { Tag } from 'vant'
<%_ } _%>

onMounted(async () => {
  const res = await getPaperInfo({ subject: 'Math', paperId: '123' }).catch(() => {
    console.error('接口异常')
  })
  console.log('接口数据：', res)
})
</script>

<style lang="scss" scoped>
.main {
  font-family: PingFangSC-Regular, PingFang SC;
  margin-top: 30px;
}
.heading {
  width: 880px;
  height: 260px;
  margin: 0 auto;
  background-image: url(@/common/assets/bg1.png);
  background-size: 100%;
  .region {
    padding: 48px 0 0 48px;
  }
  .subtitle {
    color: #fff;
    font-size: 22px;
    margin-top: 12px;
  }
  img {
    width: 82px;
    height: 28px;
    float: right;
    margin-right: 39px;
  }
}
.content {
  margin: 0 auto;
  width: 880px;
  height: 340px;
  margin-top: 20px;
  .left {
    width: 530px;
    height: 340px;
    margin-right: 12px;
    background-image: url(@/common/assets/bg2.png);
    background-size: 100%;
    display: inline-block;
    vertical-align: top;
    .desc {
      color: #333;
      font-size: 40px;
      margin: 48px 0 24px 48px;
    }
    .sm {
      font-size: 26px;
      margin: 0 0 0 48px;
    }
  }
  .right {
    width: 338px;
    height: 340px;
    display: inline-block;
    .link {
      width: 338px;
      height: 164px;
      border-radius: 24px;
      a {
        height: 164px;
        text-align: center;
        line-height: 164px;
        font-size: 22px;
        color: #333;
      }
    }
    .link:first-child {
      background-color: #f5fff7;
    }
    .link:nth-last-child(2n + 1) {
      background-color: #fff7f5;
    }
    .link + .link {
      margin-top: 12px;
    }
  }
}
</style>
