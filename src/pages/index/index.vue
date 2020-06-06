<template>
  <view class="content">
    <!-- <uni-nav-bar left-icon="back" title="剑未配妥，出门已是江湖" fixed status-bar :border="false"></uni-nav-bar> -->
    <u-navbar title="首页" :is-back="false"></u-navbar>
	  <u-button type="primary" @click="pay">立即支付</u-button>
  </view>
</template>

<script>
import { payment } from "@/common";
export default {
  data() {
    return {
    }
  },
  onShareAppMessage() {
    return this.$getShareInfo();
  },
  onLoad() {
  },
  onShow () {
  },
  created() {},
  methods: {
    pay() {
      // uni.navigateToMiniProgram({
      // 	appId: 'wx5e7698d3578efc06',
      // 	path: 'pages/pay/pay?tokenId=123&money=2',
      // 	envVersion: __wxConfig.envVersion,
      // })
      // uni.navigateTo({url:'/pages/goods/index'})
      this.$Router.push('goods')
      // let tokenId = "T202006051706126844";
      // payment(tokenId)
      //   .then(res => {
      //     console.log("支付成功");
      //   })
      //   .catch(res => {
      //     console.log("支付失败");
      //   });
    }
  }
};
</script>

<style lang="scss">
.content {
  color: $uni-color-primary;
  font-family: "Bitstream Vera Serif Bold";
}
</style>
