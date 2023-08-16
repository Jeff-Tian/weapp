import WebMarkdownViewer from "@/components/markdown-viewer/h5";
import {render} from "@testing-library/react";

it('renders', async () => {
  const {container} = render(
    <WebMarkdownViewer markdown='hello' />
  );

  expect(container.textContent).toBe(`hello
`);
})

describe('renders images with self vercel proxies', () => {
  it('https', async () => {
    const {container} = render(
      <WebMarkdownViewer markdown='![test](https://img.alicdn.com/tfs/TB1.jpg)' />
    );

    expect(container.querySelector('img')?.src).toBe('http://localhost/https/img.alicdn.com/tfs/TB1.jpg')
  })

  it('http', async () => {
    const {container} = render(
      <WebMarkdownViewer markdown='![test](http://img.alicdn.com/tfs/TB1.jpg)' />
    );

    expect(container.querySelector('img')?.src).toBe('http://localhost/http/img.alicdn.com/tfs/TB1.jpg')
  })
})
