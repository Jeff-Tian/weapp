module.exports = {  globals: {
    window: true,
    ENABLE_INNER_HTML: true,
    ENABLE_ADJACENT_HTML: true,
    ENABLE_SIZE_APIS: true,
    ENABLE_TEMPLATE_CONTENT: true,
    ENABLE_CLONE_NODE: true,
    ENABLE_CONTAINS: true,
    ENABLE_MUTATION_OBSERVER: true,
  },
  verbose: true,
  moduleFileExtensions: ['js', 'ts', 'jsx', 'tsx', 'json'],
  rootDir: __dirname,
  testMatch: ['**/__tests__/**/*.(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.[jt]s?(x)?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mock__/fileTransformer',
  },
  transformIgnorePatterns: ['<rootDir>/dist/'],
  coveragePathIgnorePatterns: ["<rootDir>/__mock__/", "<rootDir>/src/utils/gio/", "<rootDir>/src/utils/jice/", '<rootDir>/src/apis/'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup'],
  moduleNameMapper: {
    '@tarojs/components': '<rootDir>/__mock__/@tarojs/components/dist-h5',
    '@tarojs/taro': '<rootDir>/__mock__/tarojs',
    '@/apis/client$': '<rootDir>/__mock__/client',
    '@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss|styl)$': 'identity-obj-proxy',
    './jice.weapp': '<rootDir>/__mock__/jice',
    '/gio-minp/gio-minp.js': '<rootDir>/__mock__/gio',
  },
  testEnvironment: 'jsdom'
}
