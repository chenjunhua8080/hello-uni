<template>
	<view class="content">
		<view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<view v-if="hasLogin">
				<image :src="avatar" class="avatar"></image>
				<view class="info">
					<view>用户名:</view>
					<view>{{userName}}</view>
					<br />
					<view>手机号:</view>
					<view>{{phone}}</view>
				</view>
				<button type="default" @tap="bindLogout">退出登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState(['forcedLogin', 'appId'])
		},
		data() {
			return {
				hasLogin: false,
				userName: '',
				avatar: '',
				phone: ''
			}
		},
		methods: {
			bindLogin() {
				var openId = uni.getStorageSync('openId');
				console.log("openId: " + openId);
				if (openId == null || openId == '') {
					window.open(
						'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appId +
						'&redirect_uri=' + encodeURIComponent(window.location.origin+"/pages/login/login") +
						'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect', '_self');
				} else {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			},
			bindLogout() {
				//清空登录状态
				uni.setStorageSync('hasLogin', false);
				uni.setStorageSync('userName', null);
				uni.setStorageSync('token', null);

				uni.reLaunch({
					url: '../main/main',
				});
			}
		},
		onShow() {
			this.hasLogin = uni.getStorageSync('hasLogin');
			this.avatar = uni.getStorageSync('avatar');
			this.userName = uni.getStorageSync('userName');
			this.phone = uni.getStorageSync('phone');
		}
	}
</script>

<style>

</style>
