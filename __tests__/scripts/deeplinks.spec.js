import {getAllDeepLinks} from "../../scripts/deeplinks";
import {compose, head, identity} from "../../scripts/helpers";

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

  it('get all the deeplink pages', () => {
    expect(getAllDeepLinks()).toEqual([
      "dist/pages/auth/authing.html",
      "dist/pages/index/index.html",
      "dist/pages/pearlsplus/1_6_1.html",
      "dist/pages/pearlsplus/c1_6_1.html",
      "dist/pages/pearlsplus/c1_6_2.html",
      "dist/pages/pearlsplus/hello.html",
      "dist/pages/subpages/about/index.html",
      "dist/pages/subpages/about/system.info.html",
      "dist/pages/subpages/auth/authing.html",
      "dist/pages/subpages/auth/keycloak.html",
      "dist/pages/subpages/auth/profile.html",
      "dist/pages/subpages/ip/index.html",
      "dist/pages/subpages/pearlsplus/c-detail.html",
      "dist/pages/subpages/pearlsplus/detail.html",
      "dist/pages/subpages/pearlsplus/index.html",
      "dist/pages/subpages/react-view/browser.html",
      "dist/pages/subpages/react-view/index.html",
      "dist/pages/subpages/test/index.html",
      "dist/pages/subpages/video/detail.html",
      "dist/pages/tictactoe/ai.html",
      "dist/pages/tictactoe/dynamic-content.html",
      "dist/pages/tictactoe/index.html",
      "dist/pages/tictactoe/index2.html",
      "dist/pages/weapp/index.html",
      "dist/pages/yuque/article.html",
      "dist/pages/yuque/index.html"
    ]);
  })
})
