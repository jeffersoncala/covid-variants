<template>
	<div id="button">
        <button class="btn" type="button" :textButton="textButton" @click="onClick">
			<div class="box-icon">
				<slot></slot>
			</div>
			<p>{{textButton}}</p>
		</button>
	</div>
</template>

<script>
export default {
	name: 'ButtonAction',
	props: {
		textButton: String,
	},
	methods: {
		onClick: {
			type: Function,
			default: function () {
				return 0
			}
		}
	}
}
</script>

<style lang="scss" scoped>
#button{
	button{
		background-color: #DC3636;
		color: #fff;
		border-radius: 10px;
		padding: 10px 20px;
		margin: 20px;

		.box-icon{

			img{
				height: 30px;
			}
		}

		p{
			font-size: 0.75rem;
			font-weight: 600;
			margin-top: 10px;
			margin-bottom: 0;
		}

		&:hover{
			background-color: #B42828;
		}
	}
}
</style>
