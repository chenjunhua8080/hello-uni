<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
			<text>|</text>
			<navigator url="../pwd/pwd">忘记密码</navigator>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				var openId = uni.getStorageSync('openId');
				if (openId == null || openId == '') {
					uni.showToast({
						icon: 'none',
						title: '请先微信授权'
					});
				}
				uni.request({
					url: 'http://h5.springeasy.cn/mp/user/bind',
					method: "POST",
					data: {
						openId: openId,
						phone: this.account,
						password: this.password
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							if (res.data.msg != null) {
								uni.showToast({
									icon: 'none',
									title: res.data.msg,
								});
							}
							uni.request({
								url: 'http://h5.springeasy.cn/mp/user/info',
								data: {
									openId: openId,
								},
								success: (res) => {
									console.log(res.data);
									if (res.data.code == 200) {
										uni.setStorageSync('hasLogin', true);
										uni.setStorageSync('userName', res.data.data.name);
										uni.setStorageSync('avatar', res.data.data.avatar);
										uni.setStorageSync('phone', res.data.data.phone);
										/**
										 * 强制登录时使用reLaunch方式跳转过来
										 * 返回首页也使用reLaunch方式
										 */
										if (this.forcedLogin) {
											uni.reLaunch({
												url: '../main/main'
											});
										} else {
											uni.reLaunch({
												url: '../user/user'
											});
										}
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.msg,
										});
									}
								},
								fail(res) {
									console.log(res);
								}
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.msg,
							});
						}
					},
					fail(res) {
						console.log(res);
					}
				});
			}
		},
		onLoad(params) {
			console.log(params);
			var code = params.code;
			console.log("code: " + code);
			var openId = uni.getStorageSync('openId');
			console.log("openId: " + openId);
			//微信授权
			if (code != null && (openId == null || openId == '')) {
				uni.request({
					url: 'http://h5.springeasy.cn/mp/token/getOAuth2Token',
					data: {
						code: code,
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							uni.setStorageSync('openId', res.data.data.openId);
							uni.setStorageSync('token', res.data.data.token);
							// uni.navigateTo({
							// 	url: '../login/login'
							// });
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.msg,
							});
						}
					},
					fail(res) {
						console.log(res);
					}
				});
			}
		},
		onReady() {
			this.initPosition();
		}
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}
</style>
