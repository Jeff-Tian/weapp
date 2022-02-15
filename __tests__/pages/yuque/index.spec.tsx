import {MockedProvider} from '@apollo/react-testing';
import {act, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import {YUQUE_BLOG, YuQueInner} from "@/pages/yuque";

const MOCKS = [
  {
    request: {
      query: YUQUE_BLOG,
      variables: {
        skip: 0,
        take: 5
      }
    },
    result: {
      data: {
        paginatedYuque: [
          {
            id: 1,
            title: 'test',
            description: 'test',
            slug: '1234',
            word_count: 4,
            created_at: '2000-01-01',
            cover: 'https://img.alicdn.com/tfs/TB1.jpg',
          }],
      },
    },
  },
];

async function wait(ms = 0) {
  await act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}

it('renders', async () => {
  const {container} = render(
    <MockedProvider addTypename={false} mocks={MOCKS}>
      <YuQueInner />
    </MockedProvider>
  );

  expect(container.textContent).toBe('加载中……加载中');

  await wait();

  expect(container.textContent).toMatch('加载中……test4 字test2000-01-01查看更多');
});
