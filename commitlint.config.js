export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修復錯誤
        'chore', // 建置過程或輔助工具的變動
        'refactor', // 重構
        'docs', // 文件更新
        'style', // 程式碼格式（不影響程式碼運行的變動）
        'test', // 測試相關
        'perf', // 效能優化
        'revert', // 回復先前的提交
      ],
    ],
    'type-empty': [2, 'never'], // 類型不能為空
    'subject-empty': [2, 'never'], // 描述不能為空
  },
};
