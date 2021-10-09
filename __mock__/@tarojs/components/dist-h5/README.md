### Customized

1. add onMount in `reactify-wc`

```js
// reactify-wc componentDidMount

// add onMount callback
onMount && onMount(this.props)
```

2. register onMount in export entry

```js   
import { callOnMount } from '@/onMount'
export var Image = reactifyWc('taro-image-core', (props) => {
  callOnMount('Image', props)
})
```