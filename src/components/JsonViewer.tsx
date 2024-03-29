import {AtForm, AtInput, AtTextarea} from "taro-ui";
import {Button, Label, View} from "@tarojs/components";
import {useState} from "react";

const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}

const JsonViewer = ({json}) => {
  console.log('json = ', json);
  const isJsonString = !!json && typeof json === 'string' && isJson(json);
  console.log('json is ', isJsonString);

  return <AtForm>
    {isJsonString && <JsonViewerWrapper json={JSON.parse(json)} initialViewMode='parsed' />}

    {(!json || typeof json === 'string') && <View>{`${json}`}</View>}
    {
      json && typeof json === 'object' && Object.keys(json).map(key => {
        if (!!json[key] && typeof json[key] === 'object') {
          return <View>
            <Label>{key} 开始：</Label>
            <JsonViewer json={json[key]} />
            <Label>{key} 结束。</Label>
          </View>
        }

        if (!!json[key] && typeof json[key] === 'string' && isJson(json[key])) {
          return <View>
            <Label>{key} 开始：</Label>
            <JsonViewer json={JSON.parse(json[key])} />
            <Label>{key} 结束。</Label>
          </View>
        }

        return <AtInput key={key} name={key} title={key} type='text' placeholder={key} value={json[key]} disabled
          onChange={() => {
                        }}
        />
      })
    }
  </AtForm>
}

export default JsonViewer

export type JsonViewerViewMode = 'raw' | 'parsed'

export const JsonViewerWrapper = ({json, initialViewMode = 'parsed'}: {
  json: object,
  initialViewMode: JsonViewerViewMode
}) => {
  const [viewMode, setViewMode] = useState<JsonViewerViewMode>(initialViewMode);
  return <View>
    <View className='at-row'>
      <View className='at-col'>
        <Button onClick={() => setViewMode('parsed')}>解析视图</Button>
      </View>
      <View className='at-col'>
        <Button onClick={() => setViewMode('raw')}>原始文本</Button>
      </View>
    </View>
    {viewMode === 'parsed' ? <JsonViewer json={json} /> :
      <AtTextarea maxLength={9999} height={800} disabled value={JSON.stringify(json, undefined, 4)}
        onChange={() => {
                  }}
      />}
  </View>
}
