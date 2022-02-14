export const OnMountConfig = {
  Icon: (props: any) => {
    console.log(props)
  },
  Picker: (props: any) => {
    console.log(props)
  },
  Image: (props: any) => {
    console.log(props)
  },
  RegionPicker: (props: any) => {
    console.log(props)
  },
  SinglePicker: (props: any) => {
    console.log(props)
  },
  DatePicker: (props: any) => {
    console.log(props)
  },
}

export type OnMountComponentType = keyof typeof OnMountConfig

export const callOnMount = (type: OnMountComponentType, props: any) => {
  if (OnMountConfig[type]) {
    OnMountConfig[type](props)
  }
}

export const setOnMountCallback = (componentOnMount: { [key in OnMountComponentType]: () => void } = {} as any) => {
  Object.keys(componentOnMount).forEach((component) => {
    OnMountConfig[component] = componentOnMount[component]
  })
}
