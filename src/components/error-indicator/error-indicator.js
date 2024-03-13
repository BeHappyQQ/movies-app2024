import React from 'react';
import { Alert, Space } from 'antd';

const ErrorIndicator = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert
      className="error-indicator"
      message="Ошибка загрузки данных"
      description="Попробуйте обновить страницу"
      type="error"
    />
  </Space>
);
export default ErrorIndicator;
