<template>
	<view class="movie-main">
		<view class="movie-body">
			<view class="movie-body-left">
				<image :src="movie.img" mode="aspectFit"></image>
			</view>
			<view class="movie-body-right">
				<view class="movie-title">{{movie.name}}</view>
				<view class="movie-actors">{{movie.actors}}</view>
				<view class="movie-action">
					<view class="movie-up">顶</view>
					<view class="movie-down">踩</view>
				</view>
			</view>
		</view>
		<view class="movie-score">豆瓣评分: {{movie.score}}</view>
		<view class="movie-desc">
			<view class="movie-desc-title">剧情简介</view>
			<view class="movie-desc-value">{{desc}}</view>
		</view>
		<view class="movie-comments">
			<view class="movie-comments-title">评论区</view>
			<view class="movie-comments-item" v-for="item in comments" :key="item.id">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				movie: {
					id: '',
					name: '',
					desc: '',
					actors: '',
					img: '',
					url: '',
					score: 0,
					comments: []
				},
				desc: '',
				comments: [],
			}
		},
		onLoad() {
			//解决图片403
			const oMeta = document.createElement('meta');
			oMeta.name = "referrer";
			oMeta.content = "no-referrer"
			document.getElementsByTagName('head')[0].appendChild(oMeta);
			console.log("set meta: " + oMeta);

			const that = this;
			//获取电影
			uni.request({
				url: 'http://h5.springeasy.cn/mp/cloud/getNowPlaying',
				success(res) {
					console.log(res);
					if (res.data.code == 200) {
						that.movie = res.data.data;
						console.log("this.movie：" + that.movie);
						//获取描述
						uni.request({
							url: 'http://h5.springeasy.cn/mp/cloud/getMovieDesc',
							data: {
								movieId: that.movie.id
							},
							success(res) {
								console.log(res);
								if (res.data.code == 200) {
									that.desc = res.data.data;
									console.log("this.desc: " + that.desc);
								} else {
									uni.showToast({
										icon: 'none',
										title: res.data.msg
									})
								}
							}
						});
						//获取评论
						uni.request({
							url: 'http://h5.springeasy.cn/mp/cloud/getComments',
							data: {
								movieId: that.movie.id,
								pageNum: 1,
								pageSize: 20
							},
							success(res) {
								console.log(res);
								if (res.data.code == 200) {
									that.comments = res.data.data;
									console.log("this.comments: " + that.comments);
								} else {
									uni.showToast({
										icon: 'none',
										title: res.data.msg
									})
								}
							}
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				}
			});
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style>
	.movie-body {
		position: relative;
		margin-bottom: 10px;
	}
	.movie-body-left {
		display: inline-block;
	}
	.movie-body-right{
		display: inline-block;
	}
</style>
