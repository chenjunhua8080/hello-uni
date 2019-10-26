<template>
	<view class="movie-main">
		<view class="movie-body">
			<view class="movie-body-left">
				<image :src="movie.img"></image>
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
			<view class="movie-desc-value">{{movie.desc}}</view>
		</view>
		<view class="movie-comments">
			<view class="movie-comments-item" v-for="item in movie.components">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				movie: ''
			}
		},
		onLoad() {
			//获取电影
			uni.request({
				url: 'http://h5.springeasy.cn/mp/cloud/getNowPlaying',
				success(res) {
					if (res.data.code == 200) {
						this.movie = res.data.data;
						//获取描述
						uni.request({
							url: 'http://h5.springeasy.cn/mp/cloud/getMovieDesc',
							success(res) {
								if (res.data.code == 200) {
									this.movie.desc = res.data.data;
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
							success(res) {
								if (res.data.code == 200) {
									this.movie.comments = res.data.data;
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
		}
	}
</script>

<style>

</style>
