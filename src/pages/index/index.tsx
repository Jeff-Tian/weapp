import {Component} from 'react'
import {Text} from '@tarojs/components'
import {AtButton, AtForm, AtInput, AtTextarea} from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.styl'
import projectConfig from '../../../project.config.json'
import HardwayLayout from "../../layout/hardway-layout"

type IndexState = Record<string, string>

export default class Index extends Component<any, IndexState> {

  constructor(props) {
    super(props)

    this.state = {
      appid: 'wx9fe2a6e64bfa9dd6',
      path: '/pages/subpages/grand-opening/index?id=38',
      extraData: JSON.stringify({
        foo: 'bar'
      }),
      envVersion: 'release'
    }
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  onSubmit(event: Event) {
    event.preventDefault()
    console.log('state = ', this.state)

    let extraData = {}
    try {
      extraData = JSON.parse(this.state.extraData)
    } catch (ex) {
      extraData = {}
    }

    let v: keyof Taro.navigateToMiniProgram.EnvVersion = 'release'
    if (this.state.envVersion === 'release' || this.state.envVersion === 'develop' || this.state.envVersion === 'trial') {
      v = this.state.envVersion
    }

    if (projectConfig.appid === this.state.appid) {
      Taro.navigateTo({
        url: this.state.path,
      }).then()
    } else {
      Taro.navigateToMiniProgram({
        appId: this.state.appid,
        path: this.state.path,
        extraData: extraData,
        envVersion: v
      }).then()
    }

    event.stopPropagation()
  }

  onReset(event: Event) {
    event.preventDefault()

    this.setState({
      value: '',
    })

    event.stopPropagation()
  }

  render() {
    return (
      <HardwayLayout>
        <Text>你要去哪个小程序的哪个页面？</Text>

        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name='appid'
            title='appid'
            type='text'
            placeholder='wx9fe2a6e64bfa9dd6'
            value={this.state.appid}
            onChange={this.handleChange.bind(this, 'appid')}
          />
          <AtInput name='path' title='页面路径' type='text' placeholder='/pages/subpages/grand-opening/index?id=38'
            value={this.state.path} onChange={this.handleChange.bind(this, 'path')}
          />
          <Text>额外参数：</Text>
          <AtTextarea
            value={this.state.extraData}
            onChange={this.handleChange.bind(this, 'extraData')}
            maxLength={Infinity}
            placeholder={JSON.stringify({foo: 'bar'})}
          />
          <AtInput name='envVersion' title='版本' type='text' placeholder='release develop trial'
            value={this.state.envVersion} onChange={this.handleChange.bind(this, 'envVersion')}
          />
          <AtButton onClick={this.onSubmit.bind(this)}>走起！</AtButton>
          {/*<AtButton formType="submit">走起！</AtButton>*/}
          {/*<AtButton formType="reset">重置</AtButton>*/}
        </AtForm>
      </HardwayLayout>
    )
  }
}
