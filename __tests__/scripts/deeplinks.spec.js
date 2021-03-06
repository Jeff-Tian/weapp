import {getAllDeepLinks} from "../../scripts/deeplinks";

describe('deeplinks', () => {
  it('get all the deeplink pages', () => {
    expect(getAllDeepLinks()).toStrictEqual([
      "dist/pages/auth/authing.html",
      "dist/pages/index/index.html",
      "dist/pages/pearlsplus/1_6_1.html",
      "dist/pages/pearlsplus/c1_6_1.html",
      "dist/pages/pearlsplus/c1_6_2.html",
      "dist/pages/pearlsplus/hello.html",
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
