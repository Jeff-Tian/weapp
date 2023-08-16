import WebMarkdownViewer from "@/components/markdown-viewer/h5";
import {render} from "@testing-library/react";

it('renders', async () => {
  const {container} = render(
    <WebMarkdownViewer markdown='hello' />
  );

  expect(container.textContent).toBe(`hello
`);
})

it('renders image with proxies', async () => {
  const {container} = render(
    <WebMarkdownViewer markdown='![test](https://img.alicdn.com/tfs/TB1.jpg)' />
  );

  expect(container.querySelector('img')?.src).toBe('https://uniheart.pa-ca.me/proxy?url=https://img.alicdn.com/tfs/TB1.jpg')
})
