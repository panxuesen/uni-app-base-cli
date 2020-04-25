<template>
	<view class="content">
		首页
		<div>11</div>
		<tojoy-text/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onShareAppMessage () {
			return this.$getShareInfo()
		},
		onLoad() {

		},
		created () {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.content {
		color: $uni-color-primary;
	}
</style>
