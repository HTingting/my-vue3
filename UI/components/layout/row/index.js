/**
 * @name: index
 * @author: 26683
 * @date: 2022/3/25 14:24
 * @description：index
 * @update: 2022/3/25 14:24
 */
import {h, provide} from 'vue'

export default {
	name: 'ZRow',
	// functional: true,  // 通过普通函数创建组件，现在已经不用这个声明了。因为vue3 的所有函数式组件都是用普通函数创建的。
	props: {
		// 栅栏间距
		gutter: {
			type: Number,
			default: 0,
		},
		tag: {
			type: String,
			default: 'div'
		},
		// 自定义classname
		className: {
			type: String,
			default: ""
		},
		type: String,
		justify: String,
		align: String,
	},

	setup(props, context) {
		const {gutter, type, justify, align, tag, className} = props

		provide('ZRow', gutter)

		return () => {
			h(
				tag,
				{
					class: [
						"z-row",
						type === 'flex' ? 'z-row-flex' : '',
						justify ? `z-row-${justify}` : '',
						align ? `z-align-${align}` : '',
						className
					]
				},
				context.slots
			)
		}
	}
}
