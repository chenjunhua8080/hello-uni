<template>
	<view class="movie-main">
		<view class="movie-body">
			<view class="movie-body-left">
				<image :src="movie.img" mode="aspectFit" class="movie-img"></image>
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
		<view class="movie-score">
			<view class="movie-score-title">豆瓣评分</view>
			<view class="movie-score-value">{{movie.score}}</view>
		</view>
		<view class="movie-desc">
			<view class="movie-desc-title">剧情简介</view>
			<view class="movie-desc-value">{{desc}}</view>
		</view>
		<view class="movie-comments">
			<view class="movie-comments-title">评论区</view>
			<view class="movie-comments-item" v-for="item in comments.data" :key="item.id">
				{{item}}
			</view>
		</view>
		<button @tap="toTop" class="to-top">回到顶部</button>
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
				comments: {
					pageNum: 1,
					pageSize: 20,
					data: []
				},
			}
		},
		methods: {
			getMovie() {
				const that = this;
				//获取电影
				uni.request({
					url: 'http://h5.springeasy.cn/mp/cloud/getNowPlaying',
					success(res) {
						console.log(res);
						if (res.data.code == 200) {
							that.movie = res.data.data;
							console.log("this.movie：" + that.movie);
							//获取详情
							that.getDesc();
							//获取评论
							that.getComments(1);
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							})
						}
					}
				});
			},
			//获取描述
			getDesc() {
				const that = this;
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
			},
			//获取评论
			getComments(pageNum) {
				const that = this;
				console.log('pageNum: ' + pageNum);
				if (pageNum != 1) {
					uni.showLoading({
						title: '正在加载'
					})
				}
				uni.request({
					url: 'http://h5.springeasy.cn/mp/cloud/getComments',
					data: {
						movieId: that.movie.id,
						pageNum: pageNum,
						pageSize: 20
					},
					success(res) {
						console.log(res);
						if (res.data.code == 200) {
							that.comments.data.push(res.data.data);
							that.comments.pageNum = pageNum;
							console.log("this.comments: " + that.comments);
						} else {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							})
						}
					},
					complete() {
						uni.hideLoading();
					}
				});
			},
			toTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}
		},
		onLoad() {
			//解决图片403
			const oMeta = document.createElement('meta');
			oMeta.name = "referrer";
			oMeta.content = "no-referrer"
			document.getElementsByTagName('head')[0].appendChild(oMeta);
			console.log("set meta: " + oMeta);
			//获取电影
			this.getMovie();
		},
		onPullDownRefresh() {
			console.log('refresh');
			//获取电影
			this.getMovie();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			//获取更多评论
			this.getComments(this.comments.pageNum + 1);
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

	.movie-img {
		width: 200px;
		margin-top: 20px;
		/* box-shadow: #8F8F94 5px 5px 5px; */
	}

	.movie-body-right {
		width: 150px;
		position: absolute;
		top: 50%;
		margin-left: 210px;
		margin-top: -75px;
	}

	.movie-title {
		font-size: 32px;
		margin-bottom: 10px;
		box-shadow: #8F8F94 5px 5px 5px;
	}

	.movie-actors {
		color: #8F8F94;
		font-size: 14px;
		margin-bottom: 10px;
		box-shadow: #8F8F94 5px 5px 5px;
	}

	.movie-up,
	.movie-down {
		display: inline-block;
		width: 50px;
		color: red;
		text-align: center;
		margin: 5px;
		box-shadow: #8F8F94 5px 5px 5px;
	}

	.movie-score-title {
		margin: 20px 0px;
		font-size: 24px;
		display: inline-block;
		box-shadow: #0FAEFF 5px 5px 5px;
	}

	.movie-score-value {
		display: inline-block;
		margin: 10px;
		font-size: 36px;
		box-shadow: #0FAEFF 5px 5px 5px;
	}

	.movie-desc-title {
		font-size: 24px;
		margin: 20px 0px;
		box-shadow: #0FAEFF 5px 5px 5px;
	}

	.movie-desc-value {
		color: #8F8F94;
	}

	.movie-comments {
		margin: 20px 0px;
	}

	.movie-comments-title {
		font-size: 24px;
		box-shadow: #0FAEFF 5px 5px 5px;
	}

	.movie-comments-item {
		margin: 20px 0px;
		color: #8F8F94;
		box-shadow: #8F8F94 5px 5px 5px;
	}

	.to-top {
		text-align: center;
		position: fixed;
		right: 20px;
		bottom:70px;
		z-index: 999;
		opacity: 0.7;
	}
	.to-top:hover{
		opacity: 1;
	}

	* {
		/* 		border: solid 1px #007AFF; */
		/* box-shadow: #8F8F94 5px 5px 5px; */
	}
</style>
