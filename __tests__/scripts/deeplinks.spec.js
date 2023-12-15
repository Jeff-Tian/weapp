import {getAllDeepLinks} from "../../scripts/deeplinks";
import {compose, head, identity} from "../../scripts/helpers";
import {redirectFor} from "@/functions/redirect";

describe('deeplinks', () => {
  it('are equal', () => {
    const res = 'test';
    expect(head(res)).toEqual('t');
    expect(head(res)).toEqual(compose(head, identity)(res))
  })

  it('flats', () => {
    const a = [[1, 2], [3, 4], [5, 6]]
    expect(a.flatMap(x => x)).toStrictEqual([
      1, 2, 3, 4, 5, 6
    ])
  })

  it('redirects', () => {
    const path = 'pages/pearlsplus/1_6_1'
    const redirectsTo = redirectFor(path);
    expect(redirectsTo).toEqual('pages/subpages/pearlsplus/1_6_1');
  })

  it('get all the deeplink pages', () => {
    expect(getAllDeepLinks()).toEqual([
      "dist/pages/index/index.html",
      "dist/pages/subpages/about/index.html",
      "dist/pages/subpages/about/system.info.html",
      "dist/pages/subpages/auth/authing.html",
      "dist/pages/subpages/auth/keycloak.html",
      "dist/pages/subpages/auth/profile.html",
      "dist/pages/subpages/brickverse/index.html",
      "dist/pages/subpages/brickverse/post.html",
      "dist/pages/subpages/face-swap/index.html",
      "dist/pages/subpages/face-swap/landmark.html",
      "dist/pages/subpages/friends/list.html",
      "dist/pages/subpages/ip/index.html",
      "dist/pages/subpages/order/support-me.html",
      "dist/pages/subpages/pearlsplus/c-detail.html",
      "dist/pages/subpages/pearlsplus/detail.html",
      "dist/pages/subpages/pearlsplus/hello.html",
      "dist/pages/subpages/pearlsplus/index.html",
      "dist/pages/subpages/pearlsplus/shared/components.html",
      "dist/pages/subpages/react-view/browser.html",
      "dist/pages/subpages/react-view/index.html",
      "dist/pages/subpages/react-view/webview.html",
      "dist/pages/subpages/red-package/index.html",
      "dist/pages/subpages/sticker/cropper.html",
      "dist/pages/subpages/sticker/index.html",
      "dist/pages/subpages/test/index.html",
      "dist/pages/subpages/tictactoe/ai.html",
      "dist/pages/subpages/tictactoe/dynamic-content.html",
      "dist/pages/subpages/tictactoe/index.html",
      "dist/pages/subpages/tictactoe/index2.html",
      "dist/pages/subpages/video/detail.html",
      "dist/pages/subpages/video/detail2.html",
      "dist/pages/subpages/video/detail3.html",
      "dist/pages/subpages/video/index.html",
      "dist/pages/yuque/article.html",
      "dist/pages/yuque/index.html"
    ]);
  })
})
