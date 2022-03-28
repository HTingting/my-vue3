/**
 * @name: index
 * @author: 26683
 * @date: 2022/3/25 14:24
 * @description：index
 * @update: 2022/3/25 14:24
 */
import { h, computed, inject} from 'vue'

export default {
	name: 'ZCol',

	props: {
		span: {
			type: Number,
			default: 24
		},
		tag: {
			type: String,
			default: 'div',
		},
		xs: Number,
		sm: Number,
		md: Number,
		lg: Number,
		xl: Number
	},

	setup(props, context) {
		const {span, tag} = props

		const gutter = inject('ZRow')

		const style = computed( () => {
			if (gutter) {
				return {
					paddingLeft: gutter/2 + 'px',
					paddingRight: gutter/2 + 'px'
				}
			}
		})

		let classList = []
		//看是否有流媒体适应的处理,把class放入到classList中
			['xs', 'sm', 'md', 'lg', 'xl'].forEach(item => {
			if (props[item]) {
				classList.push(`z-col-${item}-${props[item]}`)
			}
		})

		return () => {
			h(tag,
				{
					class: [
						'z-col',
						`z-col-${span}`,
						classList
					],
					style: style.value
			},
			context.slots)
		}
	}
}
