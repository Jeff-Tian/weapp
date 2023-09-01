import Taro from "@tarojs/taro";
import qs from "querystring";

const getCurrentPath = (router = Taro.getCurrentInstance().router) => {
    if (!router) {
        return ``;
    }

    const {params, path} = router;
    const pathWithoutQuery = path.split("?")[0];
    const {$taroTimestamp, ...query} = params;

    return `${pathWithoutQuery}${Object.keys(query).length === 0 ? '' : `?${qs.stringify(query)}`}`;
};

const getCurrentPageUrl = (router = Taro.getCurrentInstance().router) => {
    const origin = document?.location?.origin ?? `https://taro.jefftian.dev`;

    return `${origin}${getCurrentPath(router)}`;
};

const copyToClipboard = (path) => {
    Taro.setClipboardData({data: `${path}`})
        .then(() =>
            Taro.showToast({
                title: `${path} 已复制`,
                icon: "success",
            })
        )
        .catch((err) =>
            Taro.showToast({
                title: `${path} 复制失败：${err}`,
                icon: "error",
            })
        );
};

export const copyCurrentPagePath = () => {
    copyToClipboard(getCurrentPath());

    Taro.showActionSheet({
        itemList: ["复制网页链接"],
        success: (res) => {
            res.tapIndex === 0 && copyToClipboard(getCurrentPageUrl());
        },

        fail: console.error,
    });
};
